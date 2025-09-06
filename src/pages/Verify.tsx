import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Eye, 
  Download,
  FileText,
  MapPin,
  Calendar,
  Camera,
  Satellite,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Upload
} from "lucide-react";

const Verify = () => {
  const [selectedRequest, setSelectedRequest] = useState<number | null>(1);

  const verificationRequests = [
    {
      id: 1,
      projectName: "Sundarbans Mangrove Restoration",
      location: "Bangladesh",
      requestDate: "2024-01-12",
      deadline: "2024-01-26",
      status: "in_review",
      priority: "high",
      carbonClaimed: "456.2 tonnes",
      area: "1,245 hectares",
      methodology: "VM0033 - Mangrove Restoration",
      requester: "Sundarbans Conservation Foundation",
      documents: [
        { name: "Project Design Document", type: "pdf", status: "verified" },
        { name: "Monitoring Report Q4 2023", type: "pdf", status: "verified" },
        { name: "Drone Survey Data", type: "zip", status: "pending" },
        { name: "Ground Truth Measurements", type: "xlsx", status: "verified" }
      ],
      images: [
        { url: "drone_survey_001.jpg", type: "drone", date: "2024-01-10" },
        { url: "ground_photo_001.jpg", type: "ground", date: "2024-01-08" },
        { url: "satellite_001.jpg", type: "satellite", date: "2024-01-05" }
      ],
      measurements: {
        biomass: "2,345 tonnes",
        soilCarbon: "1,234 tonnes", 
        totalCarbon: "3,579 tonnes",
        confidence: "94%"
      }
    },
    {
      id: 2,
      projectName: "Senegal Coastal Wetlands",
      location: "Senegal",
      requestDate: "2024-01-10",
      deadline: "2024-01-24",
      status: "pending",
      priority: "medium",
      carbonClaimed: "234.8 tonnes",
      area: "890 hectares",
      methodology: "VM0024 - Wetland Conservation",
      requester: "Senegal Coastal Initiative",
      documents: [
        { name: "Project Design Document", type: "pdf", status: "pending" },
        { name: "Baseline Study", type: "pdf", status: "pending" },
        { name: "Community Engagement Report", type: "pdf", status: "pending" }
      ],
      images: [],
      measurements: {
        biomass: "890 tonnes",
        soilCarbon: "567 tonnes",
        totalCarbon: "1,457 tonnes",
        confidence: "87%"
      }
    },
    {
      id: 3,
      projectName: "Australian Seagrass Restoration",
      location: "Great Barrier Reef, Australia",
      requestDate: "2024-01-08",
      deadline: "2024-01-22",
      status: "approved",
      priority: "low",
      carbonClaimed: "312.5 tonnes",
      area: "1,560 hectares",
      methodology: "VM0021 - Seagrass Conservation",
      requester: "Marine Conservation Australia",
      documents: [
        { name: "Project Design Document", type: "pdf", status: "verified" },
        { name: "Marine Survey Report", type: "pdf", status: "verified" },
        { name: "Water Quality Data", type: "csv", status: "verified" }
      ],
      images: [
        { url: "underwater_001.jpg", type: "underwater", date: "2024-01-05" },
        { url: "drone_coastal_001.jpg", type: "drone", date: "2024-01-04" }
      ],
      measurements: {
        biomass: "1,890 tonnes",
        soilCarbon: "978 tonnes",
        totalCarbon: "2,868 tonnes",
        confidence: "91%"
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "success";
      case "in_review": return "warning";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="w-4 h-4" />;
      case "zip": return <Download className="w-4 h-4" />;
      case "xlsx": return <BarChart3 className="w-4 h-4" />;
      case "csv": return <BarChart3 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const selectedData = verificationRequests.find(req => req.id === selectedRequest);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Verification Dashboard</h1>
            <p className="text-muted-foreground">Review and verify carbon sequestration claims</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Verifier: Dr. Sarah Chen</Badge>
            <Badge variant="success">Level 3 Certified</Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-elevation">
            <CardHeader className="pb-2">
              <CardDescription>Pending Reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <div className="text-xs text-muted-foreground">Requests</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elevation">
            <CardHeader className="pb-2">
              <CardDescription>Approved This Month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <div className="text-xs text-success">+15% vs last month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elevation">
            <CardHeader className="pb-2">
              <CardDescription>Carbon Verified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,456</div>
              <div className="text-xs text-muted-foreground">tonnes CO₂</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-ocean text-white border-0 shadow-ocean">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/80">Success Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <div className="text-xs text-white/80">Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Verification Requests List */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-elevation">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Verification Queue
                </CardTitle>
                <CardDescription>Requests awaiting review</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {verificationRequests.map((request) => (
                  <div
                    key={request.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedRequest === request.id 
                        ? "bg-primary/10 border border-primary/20" 
                        : "bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedRequest(request.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{request.projectName}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {request.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant={getStatusColor(request.status) as any} className="text-xs">
                          {request.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant={getPriorityColor(request.priority) as any} className="text-xs">
                          {request.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Carbon: {request.carbonClaimed}</div>
                      <div>Deadline: {request.deadline}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Detailed Review Panel */}
          <div className="lg:col-span-2">
            {selectedData ? (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="measurements">Data</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card className="bg-gradient-card border-0 shadow-elevation">
                    <CardHeader>
                      <CardTitle>{selectedData.projectName}</CardTitle>
                      <CardDescription>Project verification overview</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Location</div>
                            <div className="font-medium">{selectedData.location}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Area</div>
                            <div className="font-medium">{selectedData.area}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Methodology</div>
                            <div className="font-medium">{selectedData.methodology}</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Carbon Claimed</div>
                            <div className="font-medium text-lg text-success">{selectedData.carbonClaimed}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Requester</div>
                            <div className="font-medium">{selectedData.requester}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Request Date</div>
                            <div className="font-medium">{selectedData.requestDate}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-success/10 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Verification Progress</div>
                        <Progress value={selectedData.status === 'approved' ? 100 : selectedData.status === 'in_review' ? 75 : 25} className="mb-2" />
                        <div className="text-xs text-muted-foreground">
                          {selectedData.status === 'approved' ? 'Verification complete' : 
                           selectedData.status === 'in_review' ? 'Under review' : 
                           'Awaiting review'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <Card className="bg-gradient-card border-0 shadow-elevation">
                    <CardHeader>
                      <CardTitle>Documentation Review</CardTitle>
                      <CardDescription>Project documents and supporting materials</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getDocumentIcon(doc.type)}
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-xs text-muted-foreground uppercase">{doc.type}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={doc.status === 'verified' ? 'default' : 'secondary'} className="text-xs">
                              {doc.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="mt-6">
                        <div className="text-sm font-medium mb-3">Visual Evidence</div>
                        <div className="grid grid-cols-3 gap-3">
                          {selectedData.images.map((image, index) => (
                            <div key={index} className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center relative group">
                              <div className="text-center">
                                {image.type === 'drone' ? <Satellite className="w-8 h-8 text-muted-foreground mx-auto mb-2" /> :
                                 image.type === 'satellite' ? <Satellite className="w-8 h-8 text-muted-foreground mx-auto mb-2" /> :
                                 <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />}
                                <div className="text-xs text-muted-foreground">{image.type}</div>
                                <div className="text-xs text-muted-foreground">{image.date}</div>
                              </div>
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <Eye className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="measurements">
                  <Card className="bg-gradient-card border-0 shadow-elevation">
                    <CardHeader>
                      <CardTitle>Carbon Measurements</CardTitle>
                      <CardDescription>Scientific data and calculations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-success/10 rounded-lg">
                          <div className="text-sm text-muted-foreground">Biomass Carbon</div>
                          <div className="text-xl font-bold text-success">{selectedData.measurements.biomass}</div>
                        </div>
                        <div className="p-4 bg-accent/10 rounded-lg">
                          <div className="text-sm text-muted-foreground">Soil Carbon</div>
                          <div className="text-xl font-bold text-accent">{selectedData.measurements.soilCarbon}</div>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/10 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Total Carbon Sequestered</div>
                        <div className="text-2xl font-bold text-primary">{selectedData.measurements.totalCarbon}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Confidence: {selectedData.measurements.confidence}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm font-medium">Methodology Compliance</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Baseline establishment</span>
                            <CheckCircle className="w-4 h-4 text-success" />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Monitoring protocol</span>
                            <CheckCircle className="w-4 h-4 text-success" />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Data quality</span>
                            <CheckCircle className="w-4 h-4 text-success" />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Permanence assessment</span>
                            <AlertCircle className="w-4 h-4 text-warning" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="review">
                  <Card className="bg-gradient-card border-0 shadow-elevation">
                    <CardHeader>
                      <CardTitle>Verification Decision</CardTitle>
                      <CardDescription>Complete your verification review</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Reviewer Comments</label>
                        <Textarea 
                          placeholder="Enter your detailed verification comments, including any concerns or observations..."
                          className="min-h-[120px]"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Recommended Carbon Credits</label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="number" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            defaultValue="456.2"
                            step="0.1"
                          />
                          <span className="text-sm text-muted-foreground">tonnes CO₂</span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="success" size="lg" className="flex-1">
                          <ThumbsUp className="w-5 h-5 mr-2" />
                          Approve Verification
                        </Button>
                        <Button variant="destructive" size="lg" className="flex-1">
                          <ThumbsDown className="w-5 h-5 mr-2" />
                          Request Revisions
                        </Button>
                      </div>

                      <div className="p-4 bg-warning/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-warning" />
                          <span className="text-sm font-medium">Important Note</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Your verification decision will be recorded on the blockchain and cannot be modified. 
                          Please ensure all documentation has been thoroughly reviewed before proceeding.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="bg-gradient-card border-0 shadow-elevation h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a verification request to begin review</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;