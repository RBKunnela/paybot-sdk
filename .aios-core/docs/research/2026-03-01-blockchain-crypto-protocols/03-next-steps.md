# Next Steps & Gaps

## Identified Gaps

### Areas Requiring Deeper Research

1. **MEV (Maximal Extractable Value):** Not deeply covered in this report. MEV is a critical topic for understanding protocol economics, L2 sequencer design, and fair ordering. Research Flashbots, MEV-Boost, and Solana's Jito Labs.

2. **Cross-chain Bridges Security:** Bridge exploits have been some of the largest in crypto history ($600M+ Ronin, $325M Wormhole). The security models of bridges (trusted, light-client, ZK-verified) deserve dedicated analysis.

3. **Data Availability Layers:** Celestia, EigenDA, and Avail are emerging as standalone DA layers. The modular blockchain thesis depends heavily on these. Not covered in depth here.

4. **Privacy Protocols:** Tornado Cash, Aztec Network, Zcash, and NEAR's Confidential Intents represent different approaches to on-chain privacy. Regulatory implications (OFAC sanctions on Tornado Cash) add complexity.

5. **Account Abstraction Deep Dive:** EIP-7702 (Pectra), ERC-4337, and native AA on zkSync/StarkNet are converging on making crypto wallets more user-friendly. Deserves a standalone analysis.

6. **Specific Tokenomics Case Studies:** While we covered tokenomics design principles, case studies of successful (ETH post-EIP-1559, SOL, BNB) and failed (LUNA/UST, FTT) tokenomics models would be valuable.

7. **Regulatory Landscape:** MiCA (EU), SEC enforcement actions (US), and global regulatory frameworks for DeFi, stablecoins, and RWA are evolving rapidly. Not covered here.

8. **Bitcoin Layer 2 Beyond Lightning:** Stacks, BOB, BitVM, RGB Protocol, and other Bitcoin L2/programmability approaches were not covered in depth.

9. **Oracle Networks:** Chainlink, Pyth, UMA, and API3 are critical infrastructure for DeFi. Oracle manipulation is a major attack vector.

10. **Decentralized Physical Infrastructure (DePIN):** Helium, Render, Filecoin, and similar protocols tokenizing physical infrastructure are a growing sector.

## Recommended Follow-Up Research

### High Priority

- **Deep dive: ZK proof systems comparison** (SNARKs vs STARKs vs Halo2 vs Plonky2) -- the underlying math and trust assumptions
- **Deep dive: Restaking economics** -- AVS sustainability, slashing risks, LRT liquidity risks
- **Deep dive: Stablecoin protocols** -- USDT, USDC, DAI/USDS, USDe (Ethena), FRAX -- backing models and systemic risk

### Medium Priority

- **Protocol revenue analysis:** Compare fee generation and sustainability across major protocols
- **Developer ecosystem comparison:** GitHub activity, developer tooling maturity, documentation quality
- **Cross-chain interoperability:** IBC, LayerZero, Wormhole, Axelar -- approaches and trade-offs

### Lower Priority

- **Gaming & NFT-specific chains:** Immutable X, Beam, Ronin -- specialized execution environments
- **Social protocols:** Farcaster, Lens Protocol -- decentralized social graphs
- **Decentralized identity:** Worldcoin, Polygon ID, Soulbound Tokens

## Action Items

1. [ ] Schedule follow-up deep research on top 3 gaps
2. [ ] Create comparison matrices for protocol selection (L1 vs L1, L2 vs L2)
3. [ ] Build a protocol landscape map visualization
4. [ ] Track quarterly TVL and adoption metrics for key protocols
5. [ ] Monitor 2026 upgrade timelines (JAM, Alpenglow, Nightshade 3.0, Fusaka)
