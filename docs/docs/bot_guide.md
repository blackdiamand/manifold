---
id: bot_guide
slug: /bot_guide
---
# Create your own trading bot!

:::caution

This is an unofficial guide and not created by Manifold! If you notice something doesn't work, report it on
[Discord](https://discord.com/invite/eHQBNBqXuh), in the #api-and-bots channel.

You are responsible for your own mana.
:::

## Welcome

Interested in quantitative finance and algorithmic trading? Why not gain some hands-on experience developing a trading bot, for free! 

This is a very basic guide to create a trading bot on [Manifold Markets](https://manifold.markets/), the largest prediction market platform. 
Unlike real-money markets, which have a high barrier to entry, Manifold uses play money to predict the 
outcome of events, with a [great track record.](https://manifold.markets/calibration)
For more information about Manifold, check out [the FAQ](/faq) or [this video](https://www.youtube.com/watch?v=DB5TfX7eaVY&t=9s).

## Support

[Here is Manifold's official API documentation.](/faq)

To connect with the Manifold community, consider joining the [Discord](https://discord.com/invite/eHQBNBqXuh), particularly the #api-and-bots channel.
Here, you can find more information about Manifold's undocumented API, for advanced users.

## Prerequisites

Try playing around with Manifold for a while, to gain familiarity with prediction markets and Manifold.

We assume you can passibly use python, and know a bit about how the web and asynchronous programming works.
We will be using the AutoFold API wrapper, for ease of access, yet fully featured capabilities and tools.

For this guide, you will need to:
- Install [AutoFold](https://github.com/willjallen/AutoFold) [Note: try ```pip install git+https://github.com/willjallen/AutoFold.git```]
- Create a separate Manifold account for your bot. You will need to submit a [pull request here](https://github.com/manifoldmarkets/manifold/pulls) to gain the bot label.
- Get some mana, Manifold's play-money currency. New accounts start with 1000 free mana. 
It's not required, but to trade with more mana, consider borrowing some from another user, or be a good predictor on your human account!

# Getting Started
Obtain your bot's API key by signing in to the bot's account, opening the [profile page](https://manifold.markets/profile), 
clicking "show advanced", and clicking the blue copy button.

[Then set your API key.](https://manifoldbot.readthedocs.io/en/latest/getting_started/quickstart.html)

Open up your favorite editor.

Let's fetch the markets
```python
from autofold.api import ManifoldAPI

m = ManifoldAPI()
market1 = m.get_market_by_slug(market_slug="will-joe-biden-be-reelected-in-2024").result()
market2 = m.get_market_by_slug(market_slug="will-joe-biden-win-the-2024-us-pres").result()
```

Here is some extremely basic arbitrage logic. If the probability deviates by 2%, it bets 10 mana on YES, on the underpriced 
side, and bets 10 mana on NO for the overpriced side. This bot is pretty dumb.

We need to round to 2 decimal points due to a limitation of the Manifold API

```python
if market1['probability'] + 0.02 < market2['probability']:
    print(m.make_bet(10, market1['id'], 'YES', round(market1['probability'], 2) + 0.01).result())
    print(m.make_bet(10, market2['id'], 'NO', round(market2['probability'], 2) - 0.01).result())

if market2['probability'] + 0.02 < market1['probability']:
    print(m.make_bet(10, market2['id'], 'YES', round(market2['probability'], 2) + 0.01).result())
    print(m.make_bet(10, market1['id'], 'NO', round(market1['probability'], 2) - 0.01).result())
```

Now run it! Since there are tons of arbitrage bots on this market, try finding a new arbitrage pair to make sure the bot really works.

## Basic algorithmic trading strategies

### Learning from other bots

There's a few non-trivial bots that you should try to take into account. 

- Botlab: trades against new and unprofitable users. If you are new, you get free liquidity against this bot
- Yuna: fetches real time sports betting odds from sportsbooks
- Ithaca: Market taking and trade copying.

### Trading fees

Manifold charges a fee of 0.25 mana per API trade.

### Latency

The house trading bot, acc, has minimal latency. Other general purpose trading bots have more lag.
The Supabase API theoretically features the least lag for reading information. Note that using Supabase to bet is not allowed.

### The Automated Market Maker

Unlike the stock market, which is a peer to peer market, Manifold utilizes an automated market maker similar to Uniswap.

The full documentation of Manifold's AMM, Maniswap, is available [here.](https://manifoldmarkets.notion.site/Maniswap-ce406e1e897d417cbd491071ea8a0c39)

### Limit Orders
