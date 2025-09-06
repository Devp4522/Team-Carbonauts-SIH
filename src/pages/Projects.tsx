import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Calendar, 
  Activity, 
  Eye, 
  Plus, 
  Search,
  Filter,
  Trees,
  Leaf,
  Waves,
  Mountain
} from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Mangrove Restoration - Sundarbans",
      description: "Large-scale mangrove forest restoration project in the Sundarbans delta, focusing on climate resilience and carbon sequestration.",
      location: "Bangladesh",
      coordinates: "22.3569° N, 89.0380° E",
      area: "1,245 hectares",
      ecosystem: "Mangrove Forest",
      status: "verified",
      progress: 87,
      carbonStored: "456.2 tonnes",
      creditsIssued: 342,
      projectOwner: "Sundarbans Conservation Foundation",
      verifier: "Climate Verify Ltd",
      startDate: "2023-03-15",
      estimatedCompletion: "2025-12-31",
      images: ["🌿", "🌊"],
      sdgGoals: ["Climate Action", "Life Below Water", "Life on Land"]
    },
    {
      id: 2,
      name: "Coastal Wetland Protection - Senegal",
      description: "Community-driven coastal wetland restoration protecting critical habitat while generating carbon credits for local communities.",
      location: "Senegal",
      coordinates: "14.4974° N, 17.1073° W",
      area: "890 hectares",
      ecosystem: "Coastal Wetland",
      status: "monitoring",
      progress: 64,
      carbonStored: "234.8 tonnes",
      creditsIssued: 187,
      projectOwner: "Senegal Coastal Initiative",
      verifier: "EcoVerify Global",
      startDate: "2023-06-22",
      estimatedCompletion: "2026-03-15",
      images: ["🌾", "🦆"],
      sdgGoals: ["No Poverty", "Climate Action", "Life Below Water"]
    },
    {
      id: 3,
      name: "Seagrass Restoration - Australia",
      description: "Innovative seagrass meadow restoration using advanced monitoring techniques and community engagement programs.",
      location: "Great Barrier Reef, Australia",
      coordinates: "16.2859° S, 145.7781° E",
      area: "2,100 hectares",
      ecosystem: "Seagrass Meadow",
      status: "pending",
      progress: 42,
      carbonStored: "712.5 tonnes",
      creditsIssued: 0,
      projectOwner: "Marine Conservation Australia",
      verifier: "GreenTech Verify",
      startDate: "2023-09-10",
      estimatedCompletion: "2027-06-30",
      images: ["🌱", "🐠"],
      sdgGoals: ["Climate Action", "Life Below Water", "Innovation"]
    },
    {
      id: 4,
      name: "Salt Marsh Conservation - Netherlands",
      description: "Restoration and conservation of historic salt marshes with cutting-edge carbon measurement technology.",
      location: "Wadden Sea, Netherlands",
      coordinates: "53.3498° N, 6.2603° E",
      area: "567 hectares",
      ecosystem: "Salt Marsh",
      status: "verified",
      progress: 95,
      carbonStored: "189.4 tonnes",
      creditsIssued: 156,
      projectOwner: "Wadden Sea Foundation",
      verifier: "EuroCarbon Verify",
      startDate: "2022-11-18",
      estimatedCompletion: "2024-08-15",
      images: ["🌾", "🦅"],
      sdgGoals: ["Climate Action", "Life on Land", "Clean Water"]
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

  const getEcosystemIcon = (ecosystem: string) => {
    switch (ecosystem.toLowerCase()) {
      case "mangrove forest": return Trees;
      case "coastal wetland": return Waves;
      case "seagrass meadow": return Leaf;
      case "salt marsh": return Mountain;
      default: return Trees;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blue Carbon Projects</h1>
            <p className="text-muted-foreground">Manage and monitor coastal restoration initiatives</p>
          </div>
          <Button variant="hero" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Create New Project
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-elevation">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search projects by name, location, or ecosystem..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="default">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            const EcosystemIcon = getEcosystemIcon(project.ecosystem);
            
            return (
              <Card key={project.id} className="bg-gradient-card border-0 shadow-elevation hover:shadow-ocean transition-all duration-300 group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-ocean rounded-lg">
                        <EcosystemIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(project.status) as any}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-success/10 rounded-lg">
                      <div className="text-sm text-muted-foreground">Carbon Stored</div>
                      <div className="text-lg font-semibold text-success">{project.carbonStored}</div>
                    </div>
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <div className="text-sm text-muted-foreground">Credits Issued</div>
                      <div className="text-lg font-semibold text-secondary">{project.creditsIssued}</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Project Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Area</div>
                      <div className="font-medium">{project.area}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Ecosystem</div>
                      <div className="font-medium">{project.ecosystem}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Owner</div>
                      <div className="font-medium">{project.projectOwner}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Verifier</div>
                      <div className="font-medium">{project.verifier}</div>
                    </div>
                  </div>

                  {/* SDG Goals */}
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">UN SDG Goals</div>
                    <div className="flex flex-wrap gap-2">
                      {project.sdgGoals.map((goal, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Started: {project.startDate}
                    </div>
                    <div>
                      Est. completion: {project.estimatedCompletion}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1">
                      <Activity className="w-4 h-4 mr-2" />
                      Monitor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;