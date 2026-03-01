# MEV and Intent-Based Trading Architectures: State of the Art (February-March 2026)

**Research Date:** 2026-03-01
**Sources Consulted:** 35+
**Coverage:** Ethereum, Solana, L2 Rollups, Cross-Chain

---

## TL;DR

- MEV extraction on Ethereum has grown to an estimated **$3 billion annually** (2025), with sandwich attacks alone accounting for $289.76 million (51.56% of MEV volume).
- **91% of Ethereum blocks** are built via MEV-Boost; the builder market is dominated by **Titan (~50-54%)**, **BuilderNet (~27%)**, and **Quasar (~16%)**.
- Intent-based protocols have reached mainstream scale: **CoW Protocol broke $9B monthly volume** in July 2025; **1inch Fusion** processes ~$67.6M daily; **Across Protocol** has bridged **$20B+ cumulative**.
- **Flashbots has pivoted from SUAVE to BuilderNet**, a TEE-based decentralized block-building network, deprecating centralized builders as of December 2024.
- **EIP-7732 (ePBS)** is the headliner of the **Glamsterdam upgrade** targeting May-June 2026, which will enshrine PBS at the protocol level and eliminate relay trust assumptions.
- **ERC-4337 smart accounts** surpassed **40 million deployments**; **EIP-7702** (Pectra, May 2025) brought account abstraction to existing EOAs.
- On Solana, **Jito controls ~95% of validator stake** and tips represent nearly two-thirds of total fees; Solana REV hit **$1.4B all-time high**.
- Cross-chain intents are standardizing around **ERC-7683** and the **Open Intents Framework (OIF)**, with 30+ teams collaborating.

---

## Table of Contents

1. [MEV Landscape](#1-mev-landscape)
2. [Intent-Based Protocols](#2-intent-based-protocols)
3. [Key Figures](#3-key-figures)
4. [Market Data](#4-market-data)
5. [Account Abstraction and ERC-4337](#5-account-abstraction-and-erc-4337)
6. [Cross-Chain Intents](#6-cross-chain-intents)
7. [Impact on Users](#7-impact-on-users)
8. [Trends](#8-trends)
9. [Sources](#9-sources)
10. [Gaps and Next Steps](#10-gaps-and-next-steps)

---

## 1. MEV Landscape

### 1.1 What is MEV?

Maximal Extractable Value (MEV) refers to the maximum value that can be extracted from block production in excess of the standard block reward and gas fees by including, excluding, and changing the order of transactions in a block. Originally termed "Miner Extractable Value" in the 2019 paper *Flash Boys 2.0* by Phil Daian et al., the concept was renamed after Ethereum's transition to proof-of-stake.

MEV manifests primarily through three strategies:

| Strategy | Mechanism | Typical Profit |
|----------|-----------|----------------|
| **Arbitrage** | Exploiting price differences across DEX pools | Low margin, high frequency |
| **Sandwich Attacks** | Front-running + back-running user trades | $289.76M in 2025 (51.56% of MEV) |
| **Liquidations** | Racing to liquidate undercollateralized positions | Variable, event-driven |

### 1.2 Flashbots: From MEV-Boost to BuilderNet

**Flashbots** (founded 2020 by Phil Daian, Scott Bigelow, Stephane Gosselin, Alex Obadia, and Tina Zhen) has been the central organization driving MEV infrastructure. Their evolution represents the broader maturation of the MEV ecosystem:

**Timeline of Flashbots evolution:**

| Period | Development | Status |
|--------|-------------|--------|
| 2021 | MEV-Boost proposed as bridge to in-protocol PBS | Production |
| Nov 2022 | SUAVE vision announced (Single Unifying Auction for Value Expression) | Vision |
| Aug 2023 | SUAVE testnet (Toliman) launched; suave-geth open sourced | Testnet |
| Dec 2024 | **BuilderNet launched**; Flashbots deprecated centralized builders | Production |
| Feb 2025 | BuilderNet v1.2 released (streamlined onboarding, TEE security) | Production |
| Oct 2025 | Delayed Refunds shipped (async refund processing) | Production |
| 2025 | Flashnet anonymous broadcast protocol introduced | R&D |
| 2026 | Rollup-Boost for L2 PBS being developed | Development |

**BuilderNet** is the practical materialization of the SUAVE vision. It is jointly operated by Flashbots, Beaverbuild, and Nethermind, running in Trusted Execution Environments (TEEs) to ensure transaction privacy. Any application can permissionlessly submit transaction order flow and be paid on a pro rata basis.

> "90% of blocks on Ethereum are built by just two parties today. Concentration in the block building market has tripled since 2022." -- [Flashbots, Introducing BuilderNet](https://buildernet.org/blog/introducing-buildernet)

**Flashnet**, a new anonymous broadcast protocol, aims to provide censorship resistance and anonymity with lower latency than existing alternatives, moving BuilderNet closer to the permissionless SUAVE vision.

### 1.3 MEV-Boost Adoption

MEV-Boost is the middleware that implements proposer-builder separation (PBS) for Ethereum validators:

| Metric | Value | Source |
|--------|-------|--------|
| Ethereum blocks via MEV-Boost | ~91% | mevboost.pics |
| Validator staking reward increase | >60% with MEV-Boost | Flashbots |
| MEV-Boost block reward vs local | 2.66x median, up to 7.9x max | Flashbots data |
| Validator adoption (largest pools) | >85% | rated.network |
| Coinbase validator adoption | 0% to 98% in 11 days | rated.network |

All validator cohorts have at least 70% adoption, with some reaching 92%. The remaining ~9% of blocks are "vanilla blocks" built locally by validators.

### 1.4 Block Builder Market

The block builder market has undergone significant consolidation. As of late February 2026:

| Builder | Market Share (24h) | Notes |
|---------|--------------------|-------|
| **Titan Builder** | 50-54% | Partnered with Banana Gun (Telegram trading bot) |
| **BuilderNet** | 26-28% | Flashbots + Beaverbuild + Nethermind collaborative |
| **Quasar** | 14-16% | Emerging competitor |
| **Beaverbuild (standalone)** | <1% | Most activity migrated to BuilderNet |
| **Others** | 2-4% | Fragmented tail |

**Historical context:** In early 2025, Beaverbuild and Titan together produced ~86% of blocks. Titan's dominance grew from exclusive order flow deals, most notably with Banana Gun. Titan's profit margin under exclusive agreements reaches 17.75%, versus Beaverbuild's 9%.

**Revenue dynamics:** Of the fees paid by transactions in winning blocks, 84% comes from exclusive transactions -- private order flow deals are the primary revenue driver for builders.

**Censorship concerns:** With Beaverbuild and rsync-builder historically censoring OFAC-sanctioned transactions, only ~40% of blocks were fully censorship-resistant at peak centralization. BuilderNet's emergence partially addresses this by distributing block-building across multiple operators.

### 1.5 Enshrined PBS (ePBS) -- EIP-7732

The Ethereum community is moving to enshrine PBS at the protocol level through EIP-7732, the headliner of the **Glamsterdam upgrade** (targeting May-June 2026):

**How ePBS works:**
1. At each slot, the validator (proposer) issues a beacon block committing to a builder's block header
2. Builders reveal full execution payloads within protocol-enforced windows
3. A Payload Timeliness Committee (PTC) monitors builder compliance
4. No trusted relays required -- the auction is on-chain

**Key challenges:**
- **Free option problem:** After committing to a header, the builder can withhold the payload if conditions change, leaving the slot empty
- **Timing games:** Builders may delay revelation to gain information advantage
- ePBS is projected to mitigate MEV by up to 70% through fairer transaction ordering

**Glamsterdam timeline:**

| Milestone | Target |
|-----------|--------|
| Scope freeze | Late Q1 2026 |
| Public testnets | Early 2026 |
| Mainnet activation | May-June 2026 |
| Post-Glamsterdam upgrade ("Hegota") | Late 2026 |

Other Glamsterdam EIPs include EIP-7928 (Block-Level Access Lists for faster validation) and EIP-7904 (general gas repricing).

### 1.6 Flashbots Protect RPC

Flashbots Protect is the longest-running and most-used private RPC in crypto:

| Metric | Value |
|--------|-------|
| Unique Ethereum accounts served | 2.1 million |
| DEX volume protected | $43 billion |
| MEV refunds returned | 400+ ETH |
| Transactions protected | 27+ million |
| Daily RPC requests | 30+ million |
| Uptime since 2021 | ~99.999% |

A critical shift: **80% of Ethereum DeFi transactions** now route through private RPCs (Flashbots Protect, MEV Blocker, and others), up from near-zero pre-Merge. This represents a fundamental change in how transactions flow through the network.

---

## 2. Intent-Based Protocols

The shift from transaction-based to intent-based DeFi is the most significant architectural change since AMMs replaced order books. Instead of specifying exact execution steps, users declare desired outcomes and specialized solvers compete to fulfill them.

### 2.1 CoW Protocol (CoW Swap)

CoW Protocol is the leading intent-based DEX aggregator, using batch auctions and a solver network for MEV-protected trading.

**Architecture:**
- Users sign off-chain intents (orders) specifying desired token swaps
- Solvers compete in batch auctions to find optimal execution paths
- **Coincidence of Wants (CoW):** Up to 20% of volume is matched internally between users, eliminating AMM fees entirely
- Remaining orders are routed through on-chain liquidity (Uniswap, Balancer, etc.)

**Key metrics (2025-2026):**

| Metric | Value | Period |
|--------|-------|--------|
| Monthly volume ATH | $9 billion | July 2025 |
| DEX aggregation market share | 34.3% | July 2025 |
| Monthly user retention | ~30% | 2025 |
| Returning monthly active users | 50-60% | 2025 |
| Internal match rate (CoW) | ~20% of volume | 2025 |
| Chains supported | Ethereum, Gnosis, Arbitrum, Base, BNB Chain | As of late 2025 |

**2025-2026 developments:**
- **Fair Combinatorial Batch Auctions (FCBAs)** launched July 2025 -- upgraded auction mechanism for faster trades, targeting 15-20% gas reduction
- **BNB Chain launch** (October 2025) with gasless transactions and MEV-protected auctions
- **Aave integration** (December 2025) -- CoW's solver network powers swaps and flash loans on Aave
- **Lens Chain deployment** (September 2025) -- gas-free transactions via bundled trade execution
- Cross-chain swap enhancements planned for Q1 2026, expanding to Cosmos and Solana ecosystems

**MEV Blocker** (by CoW DAO):

| Metric | Value |
|--------|-------|
| Trading volume protected | $188 billion+ |
| Users protected | 2.4 million+ |
| ETH rebates returned | 4,324+ ETH |
| CoW Swap surplus returned | $136M+ |

MEV Blocker mixes real and AI-generated fake transactions, strips slippage tolerance from swap data, and runs order flow auctions where 90% of backrun value goes to users.

### 2.2 UniswapX

UniswapX is Uniswap's intent-based trading protocol, representing the evolution of the world's largest DEX into the intents paradigm.

**Architecture:**
- Users sign off-chain orders (intents)
- **Fillers** (solvers) compete via Dutch auctions to execute orders
- Fillers can source liquidity from AMMs, private inventory, or cross-chain sources
- Gas abstraction: users never pay gas directly
- Internalized MEV: price improvement flows to users, not extractors

**Key developments (2025-2026):**
- **UNIfication proposal** (December 2025): Hayden Adams' first-ever governance proposal, passed with 125.3M UNI votes in favor (vs. 742 against). Activates protocol fees (0.05% redirected from existing LP fees), burns 100M UNI tokens (~$590-600M), and establishes legal DUNA framework
- **Gasless swaps** implemented July 2025
- Cross-chain swap integration launched October 2024
- Fee rollout expanding to remaining v3 pools and 8 additional chains in early 2026
- Future phases will incorporate UniswapX, PFDA (MEV routing to protocol), and aggregator hooks

**Structural position:** UniswapX benefits from Uniswap's unmatched liquidity depth and brand recognition. While CoW Protocol leads in aggregation market share, UniswapX captures direct-to-DEX volume through wallet integrations and the Uniswap frontend.

### 2.3 1inch Fusion

1inch Fusion uses Dutch auctions with whitelisted resolvers (solvers) for gasless, MEV-protected swaps.

**Architecture:**
- Users sign off-chain orders with price and time parameters
- Top 10 resolvers compete via Dutch auction (ranked by "unicorn power" -- staked 1INCH tokens)
- **Fusion+** extends to cross-chain via Hashed Timelock Contracts (HTLCs)
- Gasless execution: resolvers pay gas on users' behalf

**Volume data (2025):**

| Quarter | Fusion Daily Avg Volume | Fusion+ Daily Avg Volume | Fusion+ Daily Active Addresses |
|---------|------------------------|--------------------------|-------------------------------|
| Q1 2025 | $59.1M (-24.1% QoQ) | $1.5M (+144.5% QoQ) | 183 (+89.9% QoQ) |
| Q2 2025 | $42.1M (decline) | $1.06M median | 187 median |
| Q3 2025 | $67.6M (+60.6% QoQ) | $2.42M median (+129.1% QoQ) | 330 median (+76.5% QoQ) |

**Resolver market:** Rizzolver leads with 38.6% share ($1.17B quarterly, Q2 2025), followed by Flowmatic at 13.8%. Since launch, ~20 resolvers have joined, executing over **$25 billion** cumulative.

**2025 milestones:**
- Fusion+ expanded to native Solana-to-EVM execution (Q3 2025)
- Proposal to remove 5% unicorn power threshold in favor of NFT-based due diligence (October 2025)

### 2.4 Across Protocol

Across Protocol is the leading intent-based cross-chain bridge, co-creator of ERC-7683.

**Architecture:**
- Users deposit assets into escrow on source chain and sign an intent message
- Relayers (solvers) front capital on destination chain for near-instant delivery (~2 seconds)
- Settlement via UMA's Optimistic Oracle
- Median fee: $0.04 per bridge transaction
- 85% of transfers are L2-to-L2

**Key metrics:**

| Metric | Value |
|--------|-------|
| Cumulative volume | $20 billion+ |
| Total transactions | 14 million+ |
| Chains supported | ~20 EVM-compatible |
| Bridging speed | ~2 seconds (often 1s L2-to-L2) |
| Median fee | $0.04 |

An academic study (arXiv, 2025) analyzed 3.5 million cross-chain intents moving $9.24 billion between June and November 2025 across Across, Mayan Swift, and deBridge, confirming Across as a top-tier intent bridge by volume.

### 2.5 Essential

Essential is building an intent-only L2 where the architecture ingests only intents -- no user-submitted transactions exist.

**Key innovations:**
- **Intent-only execution:** Every state transition is a solution to a batch of intents
- **Domain-Specific Language (DSL)** for expressing intents
- **Modular intent layer** that can integrate with existing blockchains
- Solvers operate without reasoning about state drift from user transactions

**Status:** Still in R&D (2024-2025), not yet live in production. Represents the most radical end of the intent-native spectrum, as opposed to UniswapX and 1inch which layer intents onto existing transactional systems.

### 2.6 Intent Protocol Comparison

| Protocol | Architecture | MEV Protection | Gas Abstraction | Cross-Chain | Solver Model |
|----------|-------------|----------------|-----------------|-------------|--------------|
| **CoW Swap** | Batch auctions | CoW matching + MEV Blocker | Yes (via solvers) | Expanding (Q1 2026) | Open solver competition |
| **UniswapX** | Dutch auctions | Internalized MEV | Yes (fillers pay gas) | Yes (since Oct 2024) | Permissionless fillers |
| **1inch Fusion** | Dutch auctions | Resolver competition | Yes (resolvers pay) | Yes (Fusion+ via HTLCs) | Top 10 whitelisted resolvers |
| **Across** | RFQ + optimistic settlement | Solver competition | Partial | Native cross-chain | Competitive relayers |
| **Essential** | Intent-only batches | By design (no txs) | Inherent | Planned | Open solver network |

---

## 3. Key Figures

### 3.1 Phil Daian (Flashbots)

Phil Daian is a crypto-economic researcher and the lead author of *Flash Boys 2.0* (2019), the paper that defined the MEV problem. He co-founded Flashbots in 2020 with the mission of mitigating MEV's negative externalities.

**Key contributions:**
- Coined the framework for understanding MEV as a systemic issue
- Led the development of MEV-Boost, BuilderNet, and the SUAVE vision
- Published 2025 research thesis: "MEV has become the dominant limit to scaling blockchains" -- documenting how MEV spam bots consume 40% of Solana blockspace and 50%+ of L2 gas
- Speaker at Princeton DeCenter 2025 Conference

Flashbots raised $60M total, reaching a $1B valuation as of July 2023.

**Note:** The user query referenced "Robert Miller" -- the person associated with Flashbots/SUAVE is **Andrew Miller**, who collaborated with Daian on SUAVE architecture and appeared jointly on Bankless podcast discussions. Andrew Miller is not listed as a Flashbots co-founder but is a key technical collaborator.

### 3.2 Hayden Adams (Uniswap / UniswapX)

Hayden Adams is the founder and CEO of Uniswap Labs, creator of the Uniswap protocol (launched 2018) and UniswapX (launched 2023).

**2025 milestone:** Adams submitted his first-ever Uniswap governance proposal -- the "UNIfication" proposal -- in December 2025. It passed overwhelmingly (125.3M UNI for, 742 against) and represents the most significant governance action in Uniswap's history:
- Activates protocol fees across v2 and v3
- Burns 100M UNI tokens (~$590-600M)
- Establishes Wyoming DUNA legal framework
- Consolidates Uniswap Foundation into Uniswap Labs

> "The protocol can now become the primary place tokens are traded." -- Hayden Adams, December 26, 2025

### 3.3 Anna George (CoW Protocol)

Anna George is the CEO and Co-Founder of CoW Protocol, which spun out from GnosisDAO in 2022 with a $23M token round (including $15M USDC from Blockchain Capital and Ethereal Ventures).

**Background:** Studied at Freie Universitat Berlin and SOAS London. Career path through GIZ, UN Development Group, and Gnosis (BD Lead, Regional Manager Asia Pacific) before founding CoW Protocol.

**2025 activity:**
- Presented CoW Swap's intent-based trading system at Web3 Forum 2025 (October)
- Oversaw CoW Protocol reaching $9B monthly volume ATH
- Led integrations with BNB Chain, Base, Aave, and Lens Chain
- CoW Protocol achieved 34.3% DEX aggregation market share

---

## 4. Market Data

### 4.1 MEV Extraction Statistics

| Metric | Value | Period/Source |
|--------|-------|---------------|
| Estimated annual MEV extraction | ~$3 billion | 2025 estimate |
| MEV extracted pre-Merge | >$500 million | 2020-Sep 2022 |
| MEV extracted post-Merge | >500,000 ETH (~$1B+) | Sep 2022-2024 |
| Top 5 searcher entities share | 80% of MEV | 2024 Flashbots data |
| Top searchers cumulative | 526,207 ETH (0.12% DEX volume) | 2022-2024 |
| Sandwich attacks daily average | 4,400+ | Oct 2022-Sep 2024 |
| Sandwich attack volume | $289.76M (51.56% of total MEV) | 2025 |
| Arbitrage profit (30-day) | $3.37M | Sep 2025 (EigenPhi) |
| Cross-chain sandwich profits | $5.27M in 2 months (1.28% bridged volume) | 2025 research |

### 4.2 Intent-Based Trading Volume

| Protocol | Volume Metric | Value | Period |
|----------|--------------|-------|--------|
| **CoW Protocol** | Monthly ATH | $9 billion | Jul 2025 |
| **CoW Swap** | Cumulative volume | $29 billion+ | Lifetime |
| **MEV Blocker** | Volume protected | $188 billion+ | Lifetime |
| **UniswapX** | Cross-chain launched | Active | Oct 2024 |
| **1inch Fusion** | Cumulative | $25 billion+ | Since launch |
| **1inch Fusion** | Daily avg (Q3 2025) | $67.6M | Q3 2025 |
| **1inch Fusion+** | Daily avg (Q3 2025) | $2.42M | Q3 2025 |
| **Across Protocol** | Cumulative bridged | $20 billion+ | Lifetime |
| **NEAR Intents** | All-time volume | $5 billion | As of early 2026 |

### 4.3 Flashbots Usage Statistics

| Metric | Value |
|--------|-------|
| MEV-Boost block share | ~91% of Ethereum blocks |
| Flashbots Protect users | 2.1 million accounts |
| Flashbots Protect DEX volume | $43 billion protected |
| Flashbots Protect transactions | 27+ million |
| Flashbots Protect daily requests | 30+ million |
| Private RPC market share (all providers) | ~80% of DeFi transactions |
| BuilderNet operators | Flashbots, Beaverbuild, Nethermind |
| Flashbots valuation | $1 billion (Jul 2023) |
| Flashbots total funding | $60 million |

### 4.4 Block Builder Market (February 2026)

| Builder | 24h Block Share | Profit Margin | Key Partner |
|---------|----------------|---------------|-------------|
| Titan | 50-54% | 17.75% | Banana Gun |
| BuilderNet | 26-28% | Low | Flashbots ecosystem |
| Quasar | 14-16% | N/A | Emerging |
| Beaverbuild (standalone) | <1% | 9% | CoW Swap (historically) |

---

## 5. Account Abstraction and ERC-4337

### 5.1 ERC-4337 Overview

ERC-4337 introduced account abstraction to Ethereum in March 2023 without consensus-layer changes. It defines:
- **UserOperations:** Pseudo-transactions expressing user intent
- **Bundlers:** Entities that package UserOps into on-chain transactions
- **EntryPoint contract:** Singleton contract handling execution
- **Paymasters:** Contracts that sponsor gas on behalf of users

### 5.2 Adoption Metrics

| Metric | Value | Source |
|--------|-------|--------|
| Smart accounts deployed | 40+ million | Cross-chain, 2023-2025 |
| Deployed in 2024 alone | ~20 million | Industry reports |
| Projected by end 2025 | 200+ million | Industry forecasts |
| Base weekly UserOps | 3+ million (87% of total) | April 2025 |
| Polygon smart accounts | 7+ million | Leading chain |

### 5.3 EIP-7702 (Pectra Upgrade, May 2025)

EIP-7702 is complementary to ERC-4337, allowing existing EOAs to temporarily delegate to smart contract code:
- Batch transactions and sponsored gas on existing addresses
- Users keep their original address (no migration needed)
- Can delegate to ERC-4337 compatible contracts
- Wallets like Ambire and Trust Wallet have deployed support

### 5.4 Bundler Ecosystem

| Bundler | Language | Maintainer |
|---------|----------|-----------|
| **Pimlico** | TypeScript | Pimlico |
| **Rundler** | Rust | Alchemy |
| **Infinitism** | TypeScript | ERC-4337 authors (reference) |
| **Voltaire** | Python | Candide |
| **Stackup** | Go | Stackup |
| **Skandha** | TypeScript | Etherspot |

### 5.5 Smart Account Providers

| Provider | Total Accounts | Key Features | 2025 Status |
|----------|---------------|--------------|-------------|
| **Biconomy** | 4.6M+ | Modular (V1/V2/Nexus), cross-chain orchestration | Gemini wallet integration (Aug 2025) |
| **Safe** | Leading deployment volume | Enterprise-grade multisig, modular plugins | Market leader by new deployments |
| **ZeroDev** | ~900K Kernel accounts | Gasless, social login, batching, chain abstraction | Powers Layer3 wallet architecture |
| **Coinbase** | Growing rapidly | Integrated with Base ecosystem | Top 5 factory, consistent growth 2025 |

**Chain distribution:** Base dominates with 65%+ of new deployments and 87% of weekly UserOperations. Polygon led the initial 2023 wave but has been overtaken.

**Market evolution:** The industry is shifting from generalized wallets to specialized smart wallets, and from static storage to programmable execution layers. Biconomy's Nexus architecture exemplifies this with "one-click, intent-driven flows across chains."

---

## 6. Cross-Chain Intents

### 6.1 The Architecture Shift

Cross-chain intents replace the traditional bridge paradigm:

**Traditional bridging:**
```
User -> Lock assets on Chain A -> Wait for finality -> Mint/unlock on Chain B
(Minutes to hours, trust assumptions, smart contract risk)
```

**Intent-based bridging:**
```
User -> Sign intent ("I want 50 USDC on Chain B") -> Solver fronts capital instantly
(Seconds, solver competition, capital efficiency)
```

### 6.2 Standards and Frameworks

**ERC-7683 (Cross-Chain Intents Standard):**
- Co-developed by Uniswap Labs and Across Protocol
- Standardizes how cross-chain interactions are expressed as intents
- Optimized for solver UX, lowering barriers to entry
- Enables universal solver networks across Ethereum mainnet, L2s, and sidechains

**Open Intents Framework (OIF):**
- Launched by Ethereum Foundation in February 2025
- 30+ teams collaborating, including Arbitrum, Optimism, Scroll, Polygon, zkSync, Linea, Gnosis, Starknet
- Builds on ERC-7683 to unify intent-based execution ecosystem-wide

**ERC-7521 (Expressive Intents for Smart Wallets):**
- Proposed by Anoma developers
- Introduces programmable constraints ("validity predicates") for conditional intents

### 6.3 Major Cross-Chain Intent Projects

| Protocol | Cumulative Volume | Speed | Key Innovation |
|----------|------------------|-------|---------------|
| **Across** | $20B+ | ~2 sec | Optimistic oracle settlement, ERC-7683 co-author |
| **NEAR Intents** | $5B | Variable | Chain abstraction + AI solver automation |
| **UniswapX** | Growing | Variable | Deep AMM liquidity integration |
| **1inch Fusion+** | $2.42M/day (Q3) | Variable | HTLC-based cross-chain execution |
| **Particle Network** | 110.9K Universal Accounts | Variable | Universal Accounts across all chains (+558% QoQ Q1 2025) |

### 6.4 Solver Centralization Risk

The biggest open challenge for intent systems is solver centralization. Most volume flows through 5-10 professional solvers. If these collude, they could:
- Extract hidden fees
- Selectively censor intents
- Create new single points of failure

True permissionless solver networks remain rare due to capital requirements, latency optimization needs, and MEV strategy sophistication.

### 6.5 Market Projections

The cross-chain DeFi market is projected to grow from $619.37 million (2025) to $4.31 billion by 2032, at a 27.47% CAGR.

---

## 7. Impact on Users

### 7.1 Sandwich Attack Mitigation

Sandwich attacks represent the most direct harm MEV inflicts on users. A sandwich attack costs users through:
1. **Front-run:** Attacker buys before user, inflating price
2. **User trade:** Executes at inflated price (worse rate)
3. **Back-run:** Attacker sells at profit, user absorbs loss

**Scale of damage:**
- 4,400+ sandwich attacks daily on Ethereum (2022-2024 average)
- $289.76 million in sandwich volume (2025)
- $7.89 million in gas fees for 125,829 attacks in October 2024 alone
- Cross-chain sandwiches: $5.27 million extracted in just 2 months

**Mitigation solutions deployed in production:**

| Solution | Mechanism | Effectiveness |
|----------|-----------|--------------|
| **Flashbots Protect** | Private RPC, transactions hidden from public mempool | 2.1M users protected |
| **MEV Blocker** | OFA with 90% backrun value to users | $188B volume protected |
| **CoW Swap** | Batch auctions, internal CoW matching | 20% trades matched internally |
| **UniswapX** | Off-chain Dutch auctions | Fillers internalize MEV as user surplus |
| **1inch Fusion** | Resolver competition via Dutch auction | Gasless, MEV-protected |
| **Encrypted mempools** | Transactions encrypted during block building | Research/early deployment |
| **Chainlink FSS** | Time-locked staking mechanism | 98.5% MEV protection rate (claimed) |

### 7.2 Better Execution Prices

Intent-based protocols deliver measurably better execution through:
- **Solver competition:** Multiple solvers bid to fill orders, driving prices toward optimality
- **Coincidence of Wants:** CoW Protocol matches 20% of trades internally at zero spread
- **Cross-venue routing:** Solvers access liquidity across AMMs, private inventory, RFQ, and cross-chain sources
- **Surplus capture:** CoW Swap has returned $136M+ in surplus to users beyond quoted prices

### 7.3 Gas Abstraction

Account abstraction and intent protocols have decoupled users from gas management:
- **ERC-4337 Paymasters:** Sponsors pay gas in any token or for free
- **UniswapX:** Fillers pay gas; users sign off-chain
- **1inch Fusion:** Resolvers cover gas costs
- **CoW Swap on Lens Chain:** Fully gas-free transactions
- **EIP-7702:** EOAs can now batch transactions and use sponsored gas without migrating to smart accounts

### 7.4 Quantified User Benefits

| Benefit | Metric | Source |
|---------|--------|--------|
| Flashbots Protect refunds | 400+ ETH returned | Flashbots |
| MEV Blocker rebates | 4,324+ ETH returned | CoW DAO |
| CoW Swap surplus | $136M+ to users | CoW Protocol |
| Uniswap Protect integration | Up to 95% cost reduction | Industry reports |
| 1inch Fusion gas savings | 100% (gasless for users) | 1inch |

---

## 8. Trends

### 8.1 MEV on L2 Rollups

L2s have become the primary battleground for MEV as activity migrates off L1:

**L2 consolidation:** Base, Arbitrum, and Optimism process ~90% of L2 transactions, with Base alone surpassing 60%. Smaller rollups face "zombie chain" status.

| L2 Network | TVL (Jan 2026) | L2 Market Share | MEV Status |
|------------|---------------|-----------------|------------|
| **Arbitrum** | $16.6B | ~41% of L2 DeFi | Timeboost ($5M+ in 7 months), sequencer decentralization planned 2026 |
| **Base** | $5.6B peak (Oct 2025) | ~46.6% of L2 DeFi TVL | Only profitable L2 ($55M, 2025); 87% of weekly UserOps |
| **OP Mainnet** | Growing | Superchain expansion | Lagging retail usage vs Base |

**Key L2 MEV dynamics:**
- **Centralized sequencers** remain the primary MEV vector -- whoever orders transactions can extract value
- **Arbitrum Timeboost:** An auction-based MEV mechanism that generated $5M+ in 7 months
- **Cross-layer sandwich attacks:** Exploit the time gap between L1 visibility and L2 confirmation
- **L3s emerging:** Application-specific chains (Arbitrum Orbit, OP Stack) let protocols internalize their own MEV
- **Rollup-Boost:** Flashbots extending PBS to L2s via a sequencer sidecar

**Upcoming:** Arbitrum plans to decentralize its sequencer by 2026. ArbOS Dia Upgrade (January 2026) enhanced gas predictability and added passkey authentication.

### 8.2 Solana MEV (Jito)

Solana's MEV ecosystem is architecturally different from Ethereum's due to its continuous block production (no mempool):

**Jito dominance:**

| Metric | Value |
|--------|-------|
| Jito validator client stake share | ~95% |
| Solana REV all-time high | $1.4 billion |
| Jito tips share of December 2024 REV | ~50% |
| Jito tips share of recent 30-day fees | ~66% |
| Jito MEV share of staking rewards | 13-15% (Q2 2025) |
| Successful arbitrage txs (1 year) | 90 million |
| Arbitrage profits (1 year) | $142.8 million |
| Avg profit per arbitrage | $1.58 |
| Sandwich bot profits (16 months) | $370-500 million |

**Jito architecture:**
- Modified Solana validator client with Block Engine + Relayer
- Relayer delays transactions 200ms for bundle formation
- Bundles: up to 5 atomic transactions, minimum 1,000 lamport tip
- Replaced chaotic spam (60% compute, 98% failure rate) with efficient auctions

**2026 competition:** Jito faces emerging alternatives:
- **Astralane:** Fallback when Jito is congested
- **Quicknode Lil-JIT:** Additional option for bundle submission
- **gRPC streaming** (Triton Yellowstone): 1-5ms latency vs 50-200ms WebSocket, critical for competitive DeFi

**Solana vs Ethereum MEV model:**

| Dimension | Ethereum | Solana |
|-----------|----------|--------|
| MEV model | Low frequency, high margin | High frequency, low margin |
| Block building | PBS (builders bid for blocks) | Continuous (Jito bundles inserted) |
| Dominant MEV | Sandwich + arbitrage | Arbitrage (90M+ txs/year) |
| Infrastructure | MEV-Boost + relays | Jito Block Engine |
| Validator adoption | ~91% MEV-Boost | ~95% Jito client |

### 8.3 Cross-Domain MEV

Cross-domain MEV exploits information asymmetries between chains:

- **Cross-chain sandwich attacks:** Attackers with visibility into bridge transactions on the source chain can sandwich trades on the destination chain before they appear. Research documented $5.27 million extracted in 2 months (1.28% of bridged volume).
- **Cross-L1/L2 arbitrage:** Exploiting price differences between Ethereum L1 and L2 DEXs during the finality gap.
- **BuilderNet's vision:** Eventually supporting cross-chain block building through SUAVE-style unified auctions.
- **Flashbots research (2025):** "MEV is the dominant limit to scaling blockchains" -- spam bots consume 50%+ of L2 gas while paying <10% of fees.

### 8.4 Regulatory Developments

- **ESMA guidance (July 2025):** European Securities and Markets Authority published comprehensive analysis finding MEV is "widespread on Ethereum and growing on some other chains."
- **Peraire-Bueno trial:** $25 million MEV exploitation case ended in mistrial (October 2025), retrial scheduled 2026. This case tests whether systematic MEV extraction constitutes market manipulation.
- **EU MiCA framework:** Evaluating private transaction routing implications.
- **Trend:** Authorities increasingly treating systematic MEV extraction as a form of market manipulation, though legal frameworks remain unsettled.

### 8.5 AI-Powered Solvers

An emerging trend for 2026: AI agents integrated into solver networks:
- Optimize yield strategies across protocols
- Auto-rebalance portfolios based on market conditions
- Negotiate private OTC deals
- Transform simple intents into continuous wealth management agents
- Early implementations already running in production on NEAR Intents and experimental CoW solvers

---

## 9. Sources

### Core Infrastructure
- [MEV-Boost - Flashbots](https://boost.flashbots.net/)
- [Flashbots Documentation](https://docs.flashbots.net/flashbots-mev-boost/introduction)
- [Introducing BuilderNet](https://buildernet.org/blog/introducing-buildernet)
- [Flashbots Writings](https://writings.flashbots.net/)
- [Flashbots BuilderNet Engineering Updates](https://collective.flashbots.net/t/engineering-update-october-2025/5343)
- [Flashbots Protect: 2M Users](https://writings.flashbots.net/2m-protect-users)
- [MEV and the Limits of Scaling](https://writings.flashbots.net/mev-and-the-limits-of-scaling)

### ePBS and Protocol Research
- [EIP-7732: Enshrined Proposer-Builder Separation](https://eips.ethereum.org/EIPS/eip-7732)
- [Ethereum Glamsterdam Upgrade Explained - Datawallet](https://www.datawallet.com/crypto/ethereum-glamsterdam-upgrade-explained)
- [Ethereum Glamsterdam - CoinDesk](https://www.coindesk.com/tech/2025/12/20/ethereum-s-glamsterdam-upgrade-aims-to-fix-mev-fairness)
- [SoK: Current State of ePBS - arXiv](https://arxiv.org/html/2506.18189v1)
- [Proposer-Builder Separation - ethereum.org](https://ethereum.org/roadmap/pbs)

### Block Builder Market
- [Builder Landscape - rated.network](https://explorer.rated.network/builders?network=mainnet&timeWindow=1d&page=1)
- [Relay and Builder Stats - relayscan.io](https://www.relayscan.io/)
- [mevboost.pics](https://mevboost.pics/)
- [Block Builder Monopoly - Gate.com](https://www.gate.com/learn/articles/monopoly-in-ethereum-block-builders-and-chain-abstraction-unveiling-profit-incentives-and-innovation-opportunities-in-the-blockchain-ecosystem/7690)
- [Who Wins Ethereum Block Building Auctions - arXiv](https://arxiv.org/pdf/2407.13931)
- [Flashbots BuilderNet Addresses Centralization - Blockworks](https://blockworks.co/news/flashbots-block-building-network-mev)

### Intent-Based Protocols
- [CoW Protocol Documentation](https://docs.cow.fi/cow-protocol/concepts/introduction/intents)
- [MEV Blocker Documentation](https://docs.mevblocker.io/)
- [CoW Swap MEV Protection Explained - Eco](https://eco.com/support/en/articles/13064300-cow-swap-explained-intent-based-dex-trading-with-mev-protection)
- [1inch Fusion Deep Dive](https://blog.1inch.com/a-deep-dive-into-1inch-fusion/)
- [State of 1inch Q3 2025 - Messari](https://messari.io/report/state-of-1inch-q3-2025)
- [Across Protocol](https://across.to/)
- [Across Protocol Documentation](https://docs.across.to/)
- [Introducing Essential](https://blog.essential.builders/introducing-essential/)

### Cross-Chain Intents
- [ERC-7683 - Archetype Fund](https://www.archetype.fund/media/erc7683-the-cross-chain-intents-standard)
- [Best Cross-Chain Intent Protocols 2026 - Eco](https://eco.com/support/en/articles/11802670-best-cross-chain-intent-protocols-2026-how-intents-are-replacing-bridges)
- [Intents and Solvers: DeFi 2026 - dCentralab](https://www.dcentralab.com/blog/intents-and-solvers-defi-in-2026)
- [NEAR Infrastructure 2026 Roadmap](https://blockonomi.com/near-infrastructure-committee-reviews-2025-progress-sets-2026-roadmap-for-scaling-chain-abstraction)
- [Chain Abstraction in 2025 - Particle Network](https://blog.particle.network/is-chain-abstraction-relevant-in-2025/)
- [Cross-Chain Sandwich Attacks - arXiv](https://arxiv.org/html/2511.15245v1)
- [Intent Bridge Liquidity Attacks - arXiv](https://arxiv.org/html/2602.17805v1)

### Account Abstraction
- [ERC-4337 Documentation](https://docs.erc4337.io/index.html)
- [ERC-4337 Bundlers List - Alchemy](https://www.alchemy.com/dapps/best/account-abstraction-erc-4337-bundlers)
- [Account Abstraction: ERC-4337 to EIP-7702 - Turnkey](https://www.turnkey.com/blog/account-abstraction-erc-4337-eip-7702)
- [Wallet Report v2 - Dune](https://dune.com/blog/wallet-report-v2)
- [Future of Smart Accounts - LongHash](https://longhashvc.medium.com/future-of-smart-accounts-modular-specialised-multichain-d04f083375a6)

### Solana MEV
- [Jito Labs](https://www.jito.wtf/)
- [Solana MEV Deep Dive - sanj.dev](https://sanj.dev/post/solana-mev-jito-deep-dive)
- [MEV Protection on Solana 2026 - DEV Community](https://dev.to/gerus_team/mev-protection-on-solana-in-2026-jito-bundles-astralane-and-what-actually-works-3gbc)
- [Jito Bundling Economic Analysis - Medium](https://medium.com/@gwrx2005/jito-bundling-and-mev-optimization-strategies-on-solana-an-economic-analysis-c035b6885e1f)
- [Solana MEV Introduction - Helius](https://www.helius.dev/blog/solana-mev-an-introduction)
- [MEV Cross-Chain Analysis 2025 - Extropy](https://academy.extropy.io/pages/articles/mev-crosschain-analysis-2025.html)

### L2 Ecosystem
- [2026 Layer 2 Outlook - The Block](https://www.theblock.co/post/383329/2026-layer-2-outlook)
- [L2 Consolidation 2026 - 21Shares via Yahoo Finance](https://finance.yahoo.com/news/most-ethereum-l2s-may-not-132236473.html)
- [L2BEAT Monthly Update December 2025](https://l2beat.com/publications/monthly-update-2025-12)

### Key Figures
- [Hayden Adams UNIfication Proposal - The Block](https://www.theblock.co/post/383121/hayden-adams-unification-proposal-final-governance-vote)
- [Anna George - CoW Protocol CEO - The Org](https://theorg.com/org/cow/org-chart/anna-george)
- [Anna George Profile - Medium](https://medium.com/thecapital/the-skyscanner-of-dexs-why-cow-protocol-and-its-founder-anna-george-deserve-your-attention-59a4a9ab2421)
- [Flashbots Company Profile - Tracxn](https://tracxn.com/d/companies/flashbots/__YfTCmThKYRZR9LpAP8fgvvFJ3D-HVQWLLlQdVpkUJSY)

### Regulatory and Legal
- [ESMA MEV Risk Analysis (July 2025)](https://www.esma.europa.eu/sites/default/files/2025-07/ESMA50-481369926-29744_Maximal_Extractable_Value_Implications_for_crypto_markets.pdf)
- [MEV Systemic Risks 2025 - ainvest](https://www.ainvest.com/news/mev-crypto-systemic-risks-mitigation-solutions-investment-opportunities-2025-2511/)
- [Private MEV Protection RPCs Benchmark - arXiv](https://arxiv.org/html/2505.19708v1)

### Data Dashboards (Live)
- [EigenPhi MEV Data](https://eigenphi.io/)
- [mevboost.pics](https://mevboost.pics/)
- [relayscan.io](https://www.relayscan.io/)
- [MEV Watch](https://www.mevwatch.info/)

---

## 10. Gaps and Next Steps

### Known Gaps in This Research

1. **Real-time UniswapX volume data:** Uniswap Labs does not publish granular UniswapX-specific volume breakdowns separate from overall Uniswap volume. Dune dashboards may have this data but were not queried.
2. **Anoma protocol status:** Anoma's mainnet timeline and current development status were not deeply investigated. Early mentions suggest it remains in development.
3. **Exact ePBS testnet results:** Devnet data for EIP-7732 implementation progress was not found in detail.
4. **MEV on newer L2s:** MEV dynamics on zkSync, Scroll, Linea, and StarkNet are underexplored relative to Arbitrum/Base/OP.
5. **Solver profitability data:** Detailed P&L data for individual solvers across protocols is scarce and mostly proprietary.
6. **Safe wallet deployment numbers:** While Safe leads in new deployments, exact cumulative account counts were not found.

### Recommended Next Steps

1. **For PayBot SDK integration:** Evaluate integrating Flashbots Protect RPC or MEV Blocker as default transaction routing for user-facing DeFi operations
2. **Intent infrastructure:** Consider building on ERC-7683 for any cross-chain payment routing features
3. **Account abstraction:** EIP-7702 + ERC-4337 stack should be evaluated for gas abstraction in payment flows
4. **Monitor Glamsterdam:** ePBS activation (May-June 2026) will fundamentally change MEV dynamics -- plan for post-ePBS architecture
5. **Solver economics research:** Deep dive into solver profitability and capital requirements for potential solver network participation
6. **Regulatory tracking:** Follow ESMA guidance and Peraire-Bueno retrial (2026) for MEV legal framework implications

---

*Research compiled 2026-03-01. All statistics sourced from cited references. Market data is point-in-time and subject to change.*
