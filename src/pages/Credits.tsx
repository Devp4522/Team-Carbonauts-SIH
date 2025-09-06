import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { 
  Coins, 
  TrendingUp, 
  Activity, 
  Shield, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Hash,
  ExternalLink,
  Download
} from "lucide-react";

const Credits = () => {
  const tokenStats = {
    totalSupply: "1,847,250",
    circulatingSupply: "1,203,456",
    marketCap: "$84,567,890",
    currentPrice: "$45.67",
    priceChange: "+2.3%",
    volume24h: "$2,345,678"
  };

  const recentTransactions = [
    {
      id: "0x1a2b3c...",
      type: "mint",
      amount: "234.5",
      from: "Sundarbans Project",
      to: "Carbon Registry",
      timestamp: "2024-01-15 14:30",
      status: "confirmed",
      txHash: "0x1a2b3c4d5e6f7890..."
    },
    {
      id: "0x2b3c4d...",
      type: "transfer",
      amount: "50.0",
      from: "0x7890...abcd",
      to: "0x1234...5678",
      timestamp: "2024-01-15 12:15",
      status: "confirmed",
      txHash: "0x2b3c4d5e6f789012..."
    },
    {
      id: "0x3c4d5e...",
      type: "retire",
      amount: "125.8",
      from: "EcoTech Corp",
      to: "Burned",
      timestamp: "2024-01-15 09:45",
      status: "confirmed",
      txHash: "0x3c4d5e6f78901234..."
    },
    {
      id: "0x4d5e6f...",
      type: "mint",
      amount: "189.2",
      from: "Senegal Wetlands",
      to: "Carbon Registry",
      timestamp: "2024-01-14 16:20",
      status: "confirmed",
      txHash: "0x4d5e6f7890123456..."
    }
  ];

  const creditBatches = [
    {
      id: "BC-001",
      project: "Sundarbans Restoration",
      issuanceDate: "2024-01-10",
      vintage: "2023",
      totalCredits: "456.2",
      availableCredits: "234.5",
      retiredCredits: "221.7",
      verifier: "Climate Verify Ltd",
      nftTokenId: "0x789abc...",
      metadataHash: "QmX1Y2Z3...",
      priceRange: "$42.50 - $48.20"
    },
    {
      id: "BC-002",
      project: "Senegal Coastal Wetlands",
      issuanceDate: "2024-01-08",
      vintage: "2023",
      totalCredits: "234.8",
      availableCredits: "156.3",
      retiredCredits: "78.5",
      verifier: "EcoVerify Global",
      nftTokenId: "0x456def...",
      metadataHash: "QmA4B5C6...",
      priceRange: "$44.10 - $47.80"
    },
    {
      id: "BC-003",
      project: "Dutch Salt Marshes",
      issuanceDate: "2024-01-05",
      vintage: "2023",
      totalCredits: "189.4",
      availableCredits: "89.2",
      retiredCredits: "100.2",
      verifier: "EuroCarbon Verify",
      nftTokenId: "0x123ghi...",
      metadataHash: "QmD7E8F9...",
      priceRange: "$46.30 - $49.50"
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "mint": return <ArrowUpRight className="w-4 h-4 text-success" />;
      case "retire": return <ArrowDownRight className="w-4 h-4 text-destructive" />;
      case "transfer": return <Activity className="w-4 h-4 text-primary" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "mint": return "text-success";
      case "retire": return "text-destructive";
      case "transfer": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Carbon Credits</h1>
            <p className="text-muted-foreground">Manage tokenized carbon credits and track transactions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="hero">
              <Coins className="w-4 h-4 mr-2" />
              Mint Credits
            </Button>
          </div>
        </div>

        {/* Token Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card className="bg-gradient-card border-0 shadow-elevation">
            <CardHeader className="pb-2">
              <CardDescription>Total Supply</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokenStats.totalSupply}</div>
              <div className="text-xs text-muted-foreground">BC Tokens</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elevation">
            <CardHeader className="pb-2">
              <CardDescription>Circulating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokenStats.circulatingSupply}</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elevation">
            <CardHeader className="pb-2">
              <CardDescription>Market Cap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokenStats.marketCap}</div>
              <div className="text-xs text-success">+5.2% today</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elevation">
            <CardHeader className="pb-2">
              <CardDescription>Current Price</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokenStats.currentPrice}</div>
              <div className="text-xs text-success">{tokenStats.priceChange}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elevation">
            <CardHeader className="pb-2">
              <CardDescription>24h Volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tokenStats.volume24h}</div>
              <div className="text-xs text-muted-foreground">Trading volume</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ocean text-white border-0 shadow-ocean">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/80">Token Health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <div className="text-xs text-white/80">Excellent</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-elevation">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Latest token movements and operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 bg-gradient-card rounded-lg border hover:shadow-glow transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(tx.type)}
                        <div>
                          <div className="font-medium capitalize flex items-center gap-2">
                            {tx.type}
                            <Badge variant="outline" className="text-xs">
                              {tx.amount} BC
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {tx.from} → {tx.to}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{tx.timestamp}</div>
                        <Badge variant="default" className="text-xs">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        <span className="font-mono">{tx.txHash.slice(0, 12)}...</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Credit Batches */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-elevation">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Credit Batches
                </CardTitle>
                <CardDescription>Verified carbon credit batches (NFTs)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {creditBatches.map((batch) => (
                  <div key={batch.id} className="p-3 bg-gradient-card rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">{batch.id}</div>
                      <Badge variant="success" className="text-xs">
                        Verified
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-3">
                      {batch.project}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Available</span>
                        <span className="font-medium text-success">{batch.availableCredits}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Retired</span>
                        <span className="font-medium text-muted-foreground">{batch.retiredCredits}</span>
                      </div>
                      <Progress 
                        value={(parseFloat(batch.retiredCredits) / parseFloat(batch.totalCredits)) * 100} 
                        className="h-1"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-3 text-xs">
                      <span className="text-muted-foreground">Vintage {batch.vintage}</span>
                      <span className="font-medium text-primary">{batch.priceRange}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Carbon Credit Marketplace */}
        <Card className="bg-gradient-hero text-white border-0 shadow-ocean">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Carbon Credit Marketplace
            </CardTitle>
            <CardDescription className="text-white/80">
              Trade verified blue carbon credits with global buyers
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-white/80 text-sm">Best Bid</div>
              <div className="text-2xl font-bold">$45.67</div>
              <div className="text-white/80 text-xs">per tonne CO₂e</div>
            </div>
            <div className="space-y-2">
              <div className="text-white/80 text-sm">Best Ask</div>
              <div className="text-2xl font-bold">$47.23</div>
              <div className="text-white/80 text-xs">per tonne CO₂e</div>
            </div>
            <div className="space-y-2">
              <div className="text-white/80 text-sm">Spread</div>
              <div className="text-2xl font-bold">$1.56</div>
              <div className="text-white/80 text-xs">3.4% spread</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Credits;