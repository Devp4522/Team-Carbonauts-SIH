import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Layers, 
  Satellite, 
  Info, 
  ZoomIn,
  Filter,
  Trees,
  Waves,
  Activity,
  BarChart3
} from "lucide-react";

const MapView = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(1);

  const projects = [
    {
      id: 1,
      name: "Sundarbans Restoration",
      location: "Bangladesh",
      coordinates: { lat: 22.3569, lng: 89.0380 },
      status: "verified",
      area: "1,245 ha",
      carbonStored: "456.2 tonnes",
      ecosystem: "Mangrove"
    },
    {
      id: 2,
      name: "Senegal Wetlands",
      location: "Senegal",
      coordinates: { lat: 14.4974, lng: -17.1073 },
      status: "monitoring",
      area: "890 ha",
      carbonStored: "234.8 tonnes",
      ecosystem: "Wetland"
    },
    {
      id: 3,
      name: "Australian Seagrass",
      location: "Australia",
      coordinates: { lat: -16.2859, lng: 145.7781 },
      status: "pending",
      area: "2,100 ha",
      carbonStored: "712.5 tonnes",
      ecosystem: "Seagrass"
    }
  ];

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Global Project Map</h1>
            <p className="text-muted-foreground">Interactive view of blue carbon restoration sites</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Layers className="w-4 h-4 mr-2" />
              Layers
            </Button>
            <Button variant="secondary" size="sm">
              <Satellite className="w-4 h-4 mr-2" />
              Satellite
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div className="grid lg:grid-cols-4 gap-6 h-[700px]">
          {/* Map Area */}
          <div className="lg:col-span-3 relative">
            <Card className="h-full bg-gradient-to-br from-blue-50 to-green-50 border-0 shadow-elevation overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Simulated World Map */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 rounded-lg">
                  {/* Ocean Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-blue-300/30 rounded-lg"></div>
                  
                  {/* Project Markers */}
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        selectedProject === project.id ? "scale-125 z-20" : "scale-100 z-10"
                      }`}
                      style={{
                        left: `${30 + index * 25}%`,
                        top: `${40 + index * 10}%`,
                      }}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <div className={`relative p-2 rounded-full shadow-lg transition-all duration-300 ${
                        project.status === 'verified' ? 'bg-success' :
                        project.status === 'monitoring' ? 'bg-warning' :
                        'bg-secondary'
                      }`}>
                        {project.ecosystem === 'Mangrove' ? <Trees className="w-4 h-4 text-white" /> :
                         project.ecosystem === 'Wetland' ? <Waves className="w-4 h-4 text-white" /> :
                         <Activity className="w-4 h-4 text-white" />}
                      </div>
                      
                      {/* Project Info Popup */}
                      {selectedProject === project.id && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-30">
                          <div className="bg-white rounded-lg shadow-ocean p-3 min-w-[200px] border">
                            <div className="text-sm font-semibold">{project.name}</div>
                            <div className="text-xs text-muted-foreground">{project.location}</div>
                            <div className="flex justify-between items-center mt-2">
                              <Badge variant={
                                project.status === 'verified' ? 'default' :
                                project.status === 'monitoring' ? 'secondary' :
                                'outline'
                              } className="text-xs">
                                {project.status}
                              </Badge>
                              <div className="text-xs text-success font-medium">
                                {project.carbonStored}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Coordinate Grid Overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full gap-0">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-muted-foreground/20"></div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-elevation">
                    <div className="text-sm font-medium mb-2">Project Status</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <span>Verified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <span>Monitoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>

                  {/* Scale */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-elevation">
                    <div className="text-xs text-muted-foreground mb-1">Scale</div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-foreground"></div>
                      <span className="text-xs">1000 km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button variant="secondary" size="icon">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Project Details */}
            {selectedProjectData && (
              <Card className="bg-gradient-card border-0 shadow-elevation">
                <CardHeader>
                  <CardTitle className="text-lg">{selectedProjectData.name}</CardTitle>
                  <CardDescription>{selectedProjectData.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge variant={
                      selectedProjectData.status === 'verified' ? 'default' :
                      selectedProjectData.status === 'monitoring' ? 'secondary' :
                      'outline'
                    }>
                      {selectedProjectData.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {selectedProjectData.ecosystem}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-muted/50 rounded">
                      <div className="text-xs text-muted-foreground">Area</div>
                      <div className="font-medium">{selectedProjectData.area}</div>
                    </div>
                    <div className="p-2 bg-success/10 rounded">
                      <div className="text-xs text-muted-foreground">Carbon</div>
                      <div className="font-medium text-success">{selectedProjectData.carbonStored}</div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    View Project Details
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Project List */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-elevation">
              <CardHeader>
                <CardTitle className="text-lg">All Projects</CardTitle>
                <CardDescription>Click on map markers to explore</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedProject === project.id 
                        ? "bg-primary/10 border border-primary/20" 
                        : "bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1 rounded-full ${
                        project.status === 'verified' ? 'bg-success' :
                        project.status === 'monitoring' ? 'bg-warning' :
                        'bg-secondary'
                      }`}>
                        {project.ecosystem === 'Mangrove' ? <Trees className="w-3 h-3 text-white" /> :
                         project.ecosystem === 'Wetland' ? <Waves className="w-3 h-3 text-white" /> :
                         <Activity className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{project.name}</div>
                        <div className="text-xs text-muted-foreground">{project.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-gradient-ocean text-white border-0 shadow-ocean">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Global Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Total Projects</span>
                  <span className="font-bold">{projects.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Total Area</span>
                  <span className="font-bold">4,235 ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Carbon Stored</span>
                  <span className="font-bold">1,403.5 tonnes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Countries</span>
                  <span className="font-bold">12</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;