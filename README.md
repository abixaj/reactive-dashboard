# Reactive Dashboard 📊

A real-time blockchain dashboard for **Reactive Network** (Chain ID 1597) with live network statistics, token burn tracking, and ReactVM explorer.

## ✨ Features

- **Real-time Network Stats** - Live data via `rnk_*` RPC methods including transaction count and block information
- - **$REACT Burn Tracker** - Visualize token burn rates with interactive charts over the last 75 blocks
  - - **Top Burners Leaderboard** - See which addresses are burning the most tokens
    - - **ReactVM Explorer** - Browse active Reactive VMs and their transaction history
      - - **Live Updates** - Data refreshes automatically (10s for stats, 15s for VMs)
        - - **Responsive Design** - Works on desktop, tablet, and mobile
          - - **Dark Mode Support** - Automatic light/dark theme detection
           
            - ## 🛠 Tech Stack
           
            - | Technology | Purpose |
            - |-----------|---------|
            - | **Next.js 16** | React framework with App Router |
            - | **React 19** | UI library |
            - | **TypeScript** | Type-safe JavaScript |
            - | **Viem 2.48** | Web3 SDK for blockchain interactions |
            - | **TanStack React Query** | Server state management and caching |
            - | **Recharts** | Interactive charts and data visualization |
            - | **Tailwind CSS 4** | Utility-first CSS framework |
            - | **Lucide React** | Icon library |
           
            - ## 🚀 Getting Started
           
            - ### Prerequisites
           
            - - Node.js 18 or higher
              - - npm or yarn package manager
               
                - ### Installation
               
                - 1. **Clone the repository**
                  2. ```bash
                     git clone https://github.com/abixaj/reactive-dashboard.git
                     cd reactive-dashboard
                     ```

                     2. **Install dependencies**
                     3. ```bash
                        npm install
                        ```

                        3. **Create environment file** (optional)
                        4. ```bash
                           cp .env.example .env.local
                           ```

                           ### Development

                           Start the development server:

                           ```bash
                           npm run dev
                           ```

                           Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

                           The page will automatically reload as you make changes.

                           ### Production Build

                           Build the project for production:

                           ```bash
                           npm run build
                           npm start
                           ```

                           ## 📁 Project Structure

                           ```
                           reactive-dashboard/
                           ├── app/
                           │   ├── layout.tsx          # Root layout with QueryProvider
                           │   ├── page.tsx            # Main dashboard component
                           │   ├── query-provider.tsx  # React Query setup
                           │   ├── globals.css         # Global styles with Tailwind
                           │   └── favicon.ico         # Favicon
                           ├── public/                 # Static assets (images, etc)
                           ├── indexer.js             # Burn indexer script (Node.js)
                           ├── burn-indexer-state.json # Indexer state persistence
                           ├── package.json           # Dependencies and scripts
                           ├── next.config.ts         # Next.js configuration
                           ├── tsconfig.json          # TypeScript configuration
                           ├── tailwind.config.ts     # Tailwind CSS config
                           └── .gitignore             # Git ignore patterns
                           ```

                           ## 🔄 How It Works

                           ### Real-Time Network Stats

                           The dashboard uses the **Reactive Network RPC** to fetch:
                           - Current block number
                           - - Total transaction count
                             - - Network statistics via `rnk_getStat()` method
                              
                               - Data refreshes every **10 seconds**.
                              
                               - ### Token Burn Tracking
                              
                               - The dashboard analyzes the **last 75 blocks** to calculate:
                               - - Total $REACT burned (in wei and formatted)
                                 - - Per-block burn amount
                                   - - Top burning addresses (smart contracts)
                                     - - Interactive line chart showing burn trends
                                      
                                       - Calculation: `gasUsed × effectiveGasPrice = fee burned`
                                      
                                       - ### ReactVM Explorer
                                      
                                       - Lists all active Reactive VMs with:
                                       - - VM ID and address
                                         - - Last transaction number
                                           - - Recent transactions from top 3 VMs
                                             - - Transaction details and addresses
                                              
                                               - ### Burn Indexer Script
                                              
                                               - Optional Node.js script for comprehensive burn analysis:
                                              
                                               - ```bash
                                                 node indexer.js
                                                 ```

                                                 This script:
                                                 - Indexes the last 200k blocks (configurable)
                                                 - - Calculates total $REACT burned
                                                   - - Saves state to `burn-indexer-state.json`
                                                     - - Outputs results to `total-burned.json`
                                                      
                                                       - Useful for historical analysis and data exports.
                                                      
                                                       - ## 🔗 API Integration
                                                      
                                                       - ### Reactive Network RPC
                                                      
                                                       - - **Endpoint**: `https://mainnet-rpc.rnk.dev/`
                                                         - - **Chain ID**: 1597
                                                           - - **Native Currency**: REACT
                                                            
                                                             - ### RPC Methods Used
                                                            
                                                             - | Method | Purpose |
                                                             - |--------|---------|
                                                             - | `rnk_getStat` | Get network statistics |
                                                             - | `rnk_getVms` | List all reactive VMs |
                                                             - | `rnk_getTransactions` | Get VM transactions |
                                                             - | `eth_getBlockNumber` | Get latest block |
                                                             - | `eth_getBlock` | Get block details |
                                                             - | `eth_getTransactionReceipt` | Get transaction receipt |
                                                            
                                                             - ## 📊 Key Metrics Displayed
                                                            
                                                             - - **Total Burned** - Cumulative $REACT burned in selected time period
                                                               - - **Latest Block** - Current blockchain height
                                                                 - - **Block Burn Rate** - Average $REACT burned per block
                                                                   - - **Top Burners** - Addresses with highest burn amounts
                                                                     - - **Active VMs** - Number of reactive virtual machines
                                                                       - - **Recent Transactions** - Latest transactions across VMs
                                                                        
                                                                         - ## ⚙️ Configuration
                                                                        
                                                                         - ### Environment Variables
                                                                        
                                                                         - Create `.env.local` (optional):
                                                                        
                                                                         - ```env
                                                                           NEXT_PUBLIC_RPC_URL=https://mainnet-rpc.rnk.dev/
                                                                           NEXT_PUBLIC_CHAIN_ID=1597
                                                                           ```

                                                                           ### Indexer Script Settings

                                                                           Edit `indexer.js` to change:

                                                                           ```javascript
                                                                           const BLOCKS_TO_INDEX = 200000; // Change this value
                                                                           ```

                                                                           ## 🚀 Deployment

                                                                           ### Deploy to Vercel (Recommended)

                                                                           1. Push to GitHub
                                                                           2. 2. Go to [vercel.com](https://vercel.com)
                                                                              3. 3. Import your repository
                                                                                 4. 4. Click "Deploy"
                                                                                   
                                                                                    5. No environment variables needed - it uses defaults!
                                                                                   
                                                                                    6. ### Deploy to Other Platforms
                                                                                   
                                                                                    7. The project builds to static HTML and can be deployed to:
                                                                                    8. - Netlify
                                                                                       - - GitHub Pages
                                                                                         - - AWS Amplify
                                                                                           - - Docker
                                                                                            
                                                                                             - ## 🧪 Testing
                                                                                            
                                                                                             - Run linting to check code quality:
                                                                                            
                                                                                             - ```bash
                                                                                               npm run lint
                                                                                               ```

                                                                                               ## 📝 Scripts

                                                                                               | Script | Description |
                                                                                               |--------|-------------|
                                                                                               | `npm run dev` | Start development server |
                                                                                               | `npm run build` | Build for production |
                                                                                               | `npm start` | Start production server |
                                                                                               | `npm run lint` | Run ESLint |
                                                                                               | `node indexer.js` | Run burn indexer script |

                                                                                               ## 🤝 Contributing

                                                                                               Contributions are welcome! Here's how to help:

                                                                                               1. Fork the repository
                                                                                               2. 2. Create a feature branch (`git checkout -b feature/amazing-feature`)
                                                                                                  3. 3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
                                                                                                     4. 4. Push to the branch (`git push origin feature/amazing-feature`)
                                                                                                        5. 5. Open a Pull Request
                                                                                                          
                                                                                                           6. ### Code Style
                                                                                                          
                                                                                                           7. - Use TypeScript for type safety
                                                                                                              - - Follow the existing code structure
                                                                                                                - - Add comments for complex logic
                                                                                                                  - - Run `npm run lint` before committing
                                                                                                                   
                                                                                                                    - ## 🐛 Troubleshooting
                                                                                                                   
                                                                                                                    - **Dashboard shows "Loading..." forever**
                                                                                                                    - - Check your internet connection
                                                                                                                      - - Verify RPC endpoint is accessible
                                                                                                                        - - Check browser console for errors
                                                                                                                         
                                                                                                                          - **Charts not displaying**
                                                                                                                          - - Ensure you have enough block history
                                                                                                                            - - Check that Recharts is properly installed
                                                                                                                             
                                                                                                                              - **RPC errors**
                                                                                                                              - - Verify the RPC URL is correct
                                                                                                                                - - Check if Reactive Network is online
                                                                                                                                  - - Try the public RPC: `https://mainnet-rpc.rnk.dev/`
                                                                                                                                   
                                                                                                                                    - ## 📜 License
                                                                                                                                   
                                                                                                                                    - This project is open source and available under the MIT License.
                                                                                                                                   
                                                                                                                                    - ## 🎯 Roadmap
                                                                                                                                   
                                                                                                                                    - Future features planned:
                                                                                                                                    - - [ ] Historical burn data export
                                                                                                                                      - [ ] - [ ] Advanced filtering and date ranges
                                                                                                                                      - [ ] - [ ] VM performance metrics
                                                                                                                                      - [ ] - [ ] Gas price predictions
                                                                                                                                      - [ ] - [ ] Multiple network support
                                                                                                                                      - [ ] - [ ] Dark mode improvements
                                                                                                                                      - [ ] - [ ] Mobile app version
                                                                                                                                     
                                                                                                                                      - [ ] ## 👥 Author
                                                                                                                                     
                                                                                                                                      - [ ] Built with ❤️ by [@abixaj](https://github.com/abixaj)
                                                                                                                                     
                                                                                                                                      - [ ] ## 📞 Support
                                                                                                                                     
                                                                                                                                      - [ ] - GitHub Issues: [Report a bug](https://github.com/abixaj/reactive-dashboard/issues)
                                                                                                                                      - [ ] - Discussions: [Ask a question](https://github.com/abixaj/reactive-dashboard/discussions)
                                                                                                                                     
                                                                                                                                      - [ ] ## 🔗 Resources
                                                                                                                                     
                                                                                                                                      - [ ] - [Reactive Network Docs](https://docs.reactive.network/)
                                                                                                                                      - [ ] - [Viem Documentation](https://viem.sh)
                                                                                                                                      - [ ] - [Next.js Documentation](https://nextjs.org/docs)
                                                                                                                                      - [ ] - [React Query Docs](https://tanstack.com/query/latest)
                                                                                                                                     
                                                                                                                                      - [ ] ---
                                                                                                                                     
                                                                                                                                      - [ ] **Made with ❤️ for Reactive Network**
