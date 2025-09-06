import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Trees, 
  Shield, 
  Coins, 
  Activity, 
  Users,
  MapPin,
  Calendar,
  Eye,
  Plus
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Carbon Sequestered",
      value: "2,456.8",
      unit: "tonnes CO₂",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Active Projects",
      value: "156",
      unit: "projects",
      change: "+8",
      trend: "up",
      icon: Trees,
      color: "text-primary"
    },
    {
      title: "Verified Credits",
      value: "1,847",
      unit: "credits",
      change: "+23.1%",
      trend: "up",
      icon: Shield,
      color: "text-accent"
    },
    {
      title: "Token Value",
      value: "$45.67",
      unit: "per credit",
      change: "+2.3%",
      trend: "up",
      icon: Coins,
      color: "text-secondary"
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Mangrove Restoration - Sundarbans",
      location: "Bangladesh",
      area: "1,245 hectares",
      status: "verified",
      progress: 87,
      credits: "456.2 tonnes",
      verifier: "Climate Verify Ltd",
      lastUpdate: "2024-01-15"
    },
    {
      id: 2,
      name: "Coastal Wetland Protection - Senegal",
      location: "Senegal",
      area: "890 hectares",
      status: "monitoring",
      progress: 64,
      credits: "234.8 tonnes",
      verifier: "EcoVerify Global",
      lastUpdate: "2024-01-12"
    },
    {
      id: 3,
      name: "Seagrass Restoration - Australia",
      location: "Australia",
      area: "2,100 hectares",
      status: "pending",
      progress: 42,
      credits: "712.5 tonnes",
      verifier: "GreenTech Verify",
      lastUpdate: "2024-01-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "success";
      case "monitoring": return "warning";
      case "pending": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Monitor your blue carbon projects and credits</p>
          </div>
          <Button variant="hero" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-elevation hover:shadow-ocean transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {stat.unit}
                  </span>
                </div>
                <div className="flex items-center text-xs text-success mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-elevation">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Trees className="w-5 h-5 text-primary" />
                      Recent Projects
                    </CardTitle>
                    <CardDescription>Latest blue carbon restoration initiatives</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-gradient-card rounded-lg border hover:shadow-glow transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                          </span>
                          <span>{project.area}</span>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(project.status) as any}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1 text-success">
                          <Activity className="w-3 h-3" />
                          <span>{project.credits} verified</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{project.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gradient-hero text-white border-0 shadow-ocean">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-white/80">
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="glass" size="sm" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
                <Button variant="glass" size="sm" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Upload Data
                </Button>
                <Button variant="glass" size="sm" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Request Verification
                </Button>
                <Button variant="glass" size="sm" className="w-full justify-start">
                  <Coins className="w-4 h-4 mr-2" />
                  Mint Credits
                </Button>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-elevation">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-success/10">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="text-sm">
                      <div className="font-medium">Project Verified</div>
                      <div className="text-muted-foreground">Sundarbans restoration approved</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-warning/10">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div className="text-sm">
                      <div className="font-medium">Data Uploaded</div>
                      <div className="text-muted-foreground">Senegal wetland measurements</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/10">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="text-sm">
                      <div className="font-medium">Credits Minted</div>
                      <div className="text-muted-foreground">234.8 tonnes CO₂ tokens</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;