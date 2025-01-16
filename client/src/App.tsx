import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import Dashboard from "@/pages/dashboard";
import LocationsPage from "@/pages/locations";
import CarsPage from "@/pages/cars";
import SparePartsPage from "@/pages/spare-parts";
import NotFound from "@/pages/not-found";

// Placeholder components for non-implemented modules
const AnalyticsPage = () => <div>Analytics</div>;
const SettingsPage = () => <div>Settings</div>;

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/locations" component={LocationsPage} />
      <Route path="/cars" component={CarsPage} />
      <Route path="/spare-parts" component={SparePartsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;