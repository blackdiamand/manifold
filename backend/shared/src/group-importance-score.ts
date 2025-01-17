import { SupabaseDirectClient } from 'shared/supabase/init'
import { map, orderBy, range, sum, uniq } from 'lodash'
import { bulkUpdate } from 'shared/supabase/utils'

const MARKETS_PER_GROUP = 50
const MIN_IMPORTANCE_SCORE = 0.05

export async function calculateGroupImportanceScore(
  pg: SupabaseDirectClient,
  readOnly = false
) {
  const importantContracts = await pg.manyOrNone<{
    importance_score: number
    contract_id: string
    group_id: string
  }>(
    `select c.importance_score, c.id as contract_id, gc.group_id
      from contracts c join group_contracts gc on c.id = gc.contract_id      
      where importance_score > $1`,
    [MIN_IMPORTANCE_SCORE]
  )

  const uniqueGroupIds = uniq(importantContracts.map((c) => c.group_id))

  const mostImportantContractsByGroupId = Object.fromEntries(
    uniqueGroupIds.map((id) => [
      id,
      orderBy(
        importantContracts.filter((c) => c.group_id === id),
        (c) => -c.importance_score
      ).slice(0, MARKETS_PER_GROUP),
    ])
  )

  if (!readOnly)
    await bulkUpdate(
      pg,
      'groups',
      ['id'],
      uniqueGroupIds.map((id) => ({
        id: id,
        importance_score: calculateGroupImportanceScoreForGroup(
          MARKETS_PER_GROUP,
          mostImportantContractsByGroupId[id].map((c) => c.importance_score)
        ),
      }))
    )
}
// [sum from i = 1 to n of 1/i * (importance_i) ] / log n
function calculateGroupImportanceScoreForGroup(
  n: number,
  scoresOrderedByImportance: number[]
): number {
  const indexes = range(1, n + 1)
  const scoresSum = sum(
    map(indexes, (i) => (1 / i) * (scoresOrderedByImportance[i - 1] ?? 0))
  )
  return scoresSum / Math.log(n)
}
