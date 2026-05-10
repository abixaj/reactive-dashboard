# Reactive Dashboard 📊

A real-time blockchain dashboard for **Reactive Network** (Chain ID 1597) with live network statistics, token burn tracking, and ReactVM explorer.

---

## ✨ Features

- **Real-time Network Stats** - Live data via `rnk_*` RPC methods including transaction count and block information
<<<<<<< HEAD
- **$REACT Burn Tracker** - Visualize token burn rates with interactive charts over the last 75 blocks
- **Top Burners Leaderboard** - See which addresses are burning the most tokens
- **ReactVM Explorer** - Browse active Reactive VMs and their transaction history
- **Live Updates** - Data refreshes automatically (10s for stats, 15s for VMs)
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Mode Support** - Automatic light/dark theme detection

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16 | React framework with App Router |
| React | 19 | UI library |
| TypeScript | 5 | Type-safe JavaScript |
| Viem | 2.48 | Web3 SDK for blockchain interactions |
| React Query | 5.100 | Server state management and caching |
| Recharts | 3.8 | Interactive charts and data visualization |
| Tailwind CSS | 4 | Utility-first CSS framework |
| Lucide React | 1.14 | Icon library |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/abixaj/reactive-dashboard.git
   cd reactive-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file** (optional)

   ```bash
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

---

## 📁 Project Structure

```
reactive-dashboard/
├── app/
│   ├── constants.ts        # Application configuration
│   ├── layout.tsx          # Root layout with QueryProvider
│   ├── page.tsx            # Main dashboard component
│   ├── types.ts            # TypeScript interfaces
│   ├── query-provider.tsx  # React Query setup
│   ├── globals.css         # Global styles with Tailwind
│   └── favicon.ico         # Favicon
├── public/                 # Static assets (images, etc)
├── indexer.js              # Burn indexer script (Node.js)
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
└── package.json            # Project dependencies
```

---

## 📊 Key Components

### Dashboard (app/page.tsx)
Main component displaying:
- Network statistics cards
- Token burn chart
- Top burners list
- ReactVM explorer with live transaction feed

### Constants (app/constants.ts)
Configuration including:
- Reactive Network RPC endpoint
- Contract addresses
- Polling intervals (10s for stats, 15s for VMs)

### Types (app/types.ts)
TypeScript interfaces for:
- Network statistics
- VM data
- Transaction data

---

## 🔌 API Integration

The dashboard uses the following RPC methods:

- `rnk_blockNumber` - Get current block number
- `rnk_getActiveVMs` - List active Reactive VMs
- `rnk_getVMTransactions` - Get VM transaction history
- `rnk_chainInfo` - Get chain information

Example RPC call:
```bash
curl -X POST https://mainnet-rpc.rnk.dev/ \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"rnk_blockNumber","params":[],"id":1}'
```

---

## 📝 Configuration

### Environment Variables (Optional)

Create `.env.local` to override defaults:

```env
NEXT_PUBLIC_RPC_URL=https://mainnet-rpc.rnk.dev/
NEXT_PUBLIC_CHAIN_ID=1597
NEXT_PUBLIC_POLL_INTERVAL_STATS=10000
NEXT_PUBLIC_POLL_INTERVAL_VMS=15000
```

---

## 🧪 Testing

Run tests:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

---

## 📝 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `node indexer.js` | Run burn indexer script |

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Add comments for complex logic
- Run `npm run lint` before committing

---

## 🐛 Troubleshooting

**Dashboard shows "Loading..." forever**
- Check your internet connection
- Verify RPC endpoint is accessible
- Check browser console for errors

**Charts not displaying**
- Ensure you have enough block history
- Check that Recharts is properly installed

**RPC errors**
- Verify the RPC URL is correct
- Check if Reactive Network is online
- Try the public RPC: `https://mainnet-rpc.rnk.dev/`

---

## 📜 License

This project is open source and available under the MIT License.

---

## 🎯 Roadmap

Future features planned:

- [ ] Historical burn data export
- [ ] Advanced filtering and date ranges
- [ ] VM performance metrics
- [ ] Gas price predictions
- [ ] Multiple network support
- [ ] Dark mode improvements
- [ ] Mobile app version

---

## 👥 Author

Built with ❤️ by [@abixaj](https://github.com/abixaj)

---

## 📞 Support

- GitHub Issues: [Report a bug](https://github.com/abixaj/reactive-dashboard/issues)
- Discussions: [Ask a question](https://github.com/abixaj/reactive-dashboard/discussions)

---

## 🔗 Resources

- [Reactive Network Docs](https://docs.reactive.network/)
- [Viem Documentation](https://viem.sh)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)

---

**Made with ❤️ for Reactive Network**