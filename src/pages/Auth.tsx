import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import authBackground from "@/assets/auth-background.jpg";
import { ChevronLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const orgDetailsSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  taxId: z.string().min(1, "Tax ID is required"),
  registrationPaymentId: z.string().min(1, "Registration Payment ID is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").optional(),
  role: z.enum(["independent_certifier", "project_developer"]),
  phoneNumber: z.string().min(1, "Phone number is required"),
  faxNumber: z.string().optional(),
  province: z.string().min(1, "Province is required"),
  address: z.string().min(1, "Address is required"),
});

const adminDetailsSchema = z.object({
  adminName: z.string().min(1, "Admin name is required"),
  adminEmail: z.string().email("Invalid email address"),
  adminPhone: z.string().min(1, "Phone number is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OrgDetailsFormData = z.infer<typeof orgDetailsSchema>;
type AdminDetailsFormData = z.infer<typeof adminDetailsSchema>;

export default function Auth() {
  const [currentStep, setCurrentStep] = useState(1);
  const [orgData, setOrgData] = useState<OrgDetailsFormData | null>(null);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const orgForm = useForm<OrgDetailsFormData>({
    resolver: zodResolver(orgDetailsSchema),
  });

  const adminForm = useForm<AdminDetailsFormData>({
    resolver: zodResolver(adminDetailsSchema),
  });

  const onLoginSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    // Handle login logic
  };

  const onOrgSubmit = (data: OrgDetailsFormData) => {
    setOrgData(data);
    setCurrentStep(2);
  };

  const onAdminSubmit = (data: AdminDetailsFormData) => {
    console.log("Complete registration:", { ...orgData, ...data });
    // Handle registration logic
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background image with branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${authBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/60" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <ChevronLeft className="h-6 w-6" />
              <span>Back to Home</span>
            </Link>
            <div className="space-y-2">
              <h1 className="text-5xl font-bold leading-tight">
                BLUE CARBON
                <br />
                REGISTRY
              </h1>
              <p className="text-xl opacity-90">
                Coastal Ecosystem Conservation Platform
              </p>
            </div>
          </div>
          <div className="text-sm opacity-75">
            Powered by Blockchain Technology
          </div>
        </div>
      </div>

      {/* Right side - Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:hidden">
            <h1 className="text-2xl font-bold text-primary">Blue Carbon Registry</h1>
            <p className="text-muted-foreground">Coastal Ecosystem Conservation</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <p className="text-sm text-muted-foreground">Welcome Back</p>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="text-right">
                        <a href="#" className="text-sm text-primary hover:underline">
                          Forgot Password?
                        </a>
                      </div>
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Organisation</CardTitle>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        01
                      </div>
                      <span className="text-sm">Organisation Details</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        02
                      </div>
                      <span className="text-sm">Organisation Admin Details</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {currentStep === 1 && (
                    <Form {...orgForm}>
                      <form onSubmit={orgForm.handleSubmit(onOrgSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={orgForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name *</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={orgForm.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Role *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="independent_certifier">🟢 Independent Certifier</SelectItem>
                                    <SelectItem value="project_developer">🏗️ Project Developer</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={orgForm.control}
                          name="taxId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tax ID *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={orgForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <div className="flex">
                                  <Select defaultValue="+94">
                                    <SelectTrigger className="w-20">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="+94">🇱🇰 +94</SelectItem>
                                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                                      <SelectItem value="+44">🇬🇧 +44</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormControl>
                                    <Input {...field} className="flex-1" />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={orgForm.control}
                            name="faxNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fax Number</FormLabel>
                                <div className="flex">
                                  <Select defaultValue="+94">
                                    <SelectTrigger className="w-20">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="+94">🇱🇰 +94</SelectItem>
                                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                                      <SelectItem value="+44">🇬🇧 +44</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormControl>
                                    <Input {...field} className="flex-1" />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={orgForm.control}
                          name="registrationPaymentId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Registration Payment ID *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={orgForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={orgForm.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input placeholder="https://" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={orgForm.control}
                          name="province"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Province *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={orgForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div>
                          <Label>Organisation Logo (File Type: JPEG, PNG) *</Label>
                          <div className="mt-2">
                            <Button type="button" variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button type="submit">NEXT</Button>
                        </div>
                      </form>
                    </Form>
                  )}

                  {currentStep === 2 && (
                    <Form {...adminForm}>
                      <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={adminForm.control}
                            name="adminName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name *</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={adminForm.control}
                            name="adminEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={adminForm.control}
                          name="adminPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <div className="flex">
                                <Select defaultValue="+94">
                                  <SelectTrigger className="w-20">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="+94">🇱🇰 +94</SelectItem>
                                    <SelectItem value="+1">🇺🇸 +1</SelectItem>
                                    <SelectItem value="+44">🇬🇧 +44</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormControl>
                                  <Input {...field} className="flex-1" />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-between">
                          <Button type="button" variant="outline" onClick={handleBack}>
                            BACK
                          </Button>
                          <Button type="submit">SUBMIT</Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-muted-foreground">
            Language: <span className="font-medium">ENGLISH</span>
          </div>
        </div>
      </div>
    </div>
  );
}