import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Shield, TrendingUp, Globe } from "lucide-react";
import heroImage from "@/assets/hero-mangroves.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mangrove forest aerial view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                  🌊 Blockchain-Powered Carbon Registry
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Blue Carbon
                  <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    MRV System
                  </span>
                </h1>
                <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                  Transparent monitoring, reporting, and verification of coastal carbon sequestration projects. 
                  Transforming mangrove restoration into verified carbon credits through blockchain technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="group">
                  Start Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="glass" size="lg">
                  Explore Dashboard
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2.4M</div>
                  <div className="text-white/70 text-sm">Tonnes CO₂</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">156</div>
                  <div className="text-white/70 text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">89%</div>
                  <div className="text-white/70 text-sm">Verified</div>
                </div>
              </div>
            </div>

            {/* Right Column - Feature Cards */}
            <div className="space-y-6 animate-slide-in">
              <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-ocean rounded-lg">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Smart Monitoring</h3>
                    <p className="text-white/70">AI-powered drone surveys and IoT sensors</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-forest rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Blockchain Verified</h3>
                    <p className="text-white/70">Immutable records and transparent verification</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Carbon Credits</h3>
                    <p className="text-white/70">Tokenized credits ready for carbon markets</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Global Impact</h3>
                    <p className="text-white/70">Contributing to climate resilience worldwide</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-ocean rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-secondary rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
    </div>
  );
};

export default Hero;