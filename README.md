# DEX Constant-Product Swap Simulator
A small tool that simulates token swaps on a DEX using the Constant-Product Market Maker model, popularised by Uniswap v2.

## Demonstration
[Check out the simulator here:](https://anasteshi.github.io/dex-amm-simulator/)

## How it Works
The core of this simulator is based on the Uniswap v2 mathematical model. It ensures that the product of the reserves of 2 tokens in a liquidity pool remains the same.

### Formulas used:

1. **Constant Product:**
   $$x \times y = k$$
   <br>
   Where x and y are the reserves of Token A and Token B, and k is the invariant.

2. **Amount Out:**
   To find how much of Token B a trader receives for a specific amount of Token A ($x_{in}$), we use:
   $$y_{out} = y_{reserve} - \frac{k}{x_{reserve} + (x_{in} - x_{in} \times fee)}$$
   <br>
   The fee is deducted from the input amount before the swap happens.

3. **Initial Price:**
   <br>
   $$initialPrice_ = \frac{y_{reserve}}{x_{reserve}}$$

5. **Slippage:**
   Slippage represents the difference between the expected market price and the actual execution price:
   $$Slippage = \frac{Price_{initial} - Price_{effective}}{Price_{initial}} \times 100%$$

## Swap Scenarios
I tested the model using a fixed pool with **100 Token A** and **1000 Token B** with a **0.003% fee**.

| Scenario | Input (A) | Output (B) | Effective Price | Slippage (%) |
| :--- | :--- | :--- | :--- | :--- |
| **Small Trade** (1%) | 1 | 9.8716 | 9.8715 | 1.28% |
| **Medium Trade** (10%) | 10 | 90.6611 | 9.0661 | 9.34% |
| **Large Trade** (40%) | 40 | 285.1015 | 7.1275 | 28.72% |


## Conclusions

* **Big trades cost more:** small trades (1% of the pool) hardly change the price. But large trades (40%) cause the price to jump significantly. This shows that trading too much at once in a small pool is very expensive for the trader.
* **The pool never runs out:** the $x \times y = k$ formula is like a protector. As tokens become rare in the pool, they automatically become much more expensive. It makes it impossible to completely empty the pool.
* **Fees:** even if the trade is very tiny, the trader always gets a slightly worse price because the 0.003% fee is taken out. This creates a starting loss for every swap.

## Resources Used
https://docs.uniswap.org/contracts/v2/concepts/protocol-overview/how-uniswap-works
https://medium.com/@tomarpari90/constant-product-automated-market-maker-everything-you-need-to-know-5bfeb0251ef2