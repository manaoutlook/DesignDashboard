import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { I18nextProvider } from 'react-i18next';
import i18n from "./lib/i18n"; // Import i18next configuration
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
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Enterprise Dashboard</h1>
        <LanguageToggle />
      </header>
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/analytics" component={AnalyticsPage} />
          <Route path="/locations" component={LocationsPage} />
          <Route path="/cars" component={CarsPage} />
          <Route path="/spare-parts" component={SparePartsPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;