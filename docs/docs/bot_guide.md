# Create your own trading bot!

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
- Install [AutoFold](https://github.com/willjallen/AutoFold) [Note: try ```pip install autofold==0.2.1```]
- Create a separate Manifold account for your bot. You will need to submit a [pull request here](https://github.com/manifoldmarkets/manifold/pulls) to gain the bot label.
- Get some mana, Manifold's play-money currency. New accounts start with 1000 free mana. 
It's not required, but to trade with more mana, consider borrowing some from another user, or be a good predictor on your human account!

# Getting Started
Obtain your bot's API key by signing in to the bot's account, opening the [profile page](https://manifold.markets/profile), 
clicking "show advanced", and clicking the blue copy button.

[Then set your API key.](https://manifoldbot.readthedocs.io/en/latest/getting_started/quickstart.html)


Open up your favorite editor.

```python3
import autofold

```

Now run it! Try finding a new arbitrage pair to make sure the bot really works.

## Considerations


### Trading fees

Manifold charges a fee of 0.25 mana per API trade.

### Latency

The house trading bot, acc, has minimal latency. Other general purpose trading bots have more lag.
The Supabase API theoretically features the least lag for reading information. Note that using Supabase to bet is not allowed.

### The Automated Market Maker

Unlike the stock market, which is a peer to peer market, Manifold utilizes an automated market maker similar to Uniswap.

The full documentation of Manifold's AMM, Maniswap, is available [here.](https://manifoldmarkets.notion.site/Maniswap-ce406e1e897d417cbd491071ea8a0c39)

### Limit Orders

## Basic algorithmic trading strategies

### Arbitrage

### Learning from other bots

- Botlab: utilizes a mean reversion strategy, trading against new and unprofitable users
- Yuna: gets real time sports betting odds from sportsbooks
- N.C.Y. Bot: arbitrages markets with the same resolution