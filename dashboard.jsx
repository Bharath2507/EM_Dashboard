import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Truck, 
  Stethoscope, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Zap,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend
} from 'recharts';

const App = () => {
  const [isOptimized, setIsOptimized] = useState(true);

  // Core Financial Data based on Report Specifications
  const metrics = useMemo(() => {
    if (isOptimized) {
      return {
        rvh: 2800,
        dailyAppts: 8,
        aov: 2400,
        margin: 48,
        travelTime: 10,
        monthlyRev: 422400,
        monthlyProfit: 202752,
        logisticsTax: "10% (Minimized)",
        status: "High Efficiency",
        clv: "₹45,000",
        cac: "₹2,200"
      };
    }
    return {
      rvh: 888,
      dailyAppts: 3.5,
      aov: 1800,
      margin: 12,
      travelTime: 42,
      monthlyRev: 151200,
      monthlyProfit: 18144,
      logisticsTax: "42% (Critical)",
      status: "Operational Loss Risk",
      clv: "₹22,000",
      cac: "₹4,800"
    };
  }, [isOptimized]);

  const chartData = [
    { name: 'Revenue', fragmented: 151200, optimized: 422400 },
    { name: 'Profit', fragmented: 18144, optimized: 202752 },
  ];

  const timeDistribution = isOptimized 
    ? [{ name: 'Service', value: 85 }, { name: 'Travel', value: 10 }, { name: 'Admin', value: 5 }]
    : [{ name: 'Service', value: 45 }, { name: 'Travel', value: 45 }, { name: 'Admin', value: 10 }];

  const COLORS = ['#002D62', '#D4AF37', '#94a3b8'];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar / Header */}
      <nav className="bg-[#002D62] text-white p-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Truck className="text-[#D4AF37]" /> Pawcare Strategic Optimizer
          </h1>
          <p className="text-slate-300 text-sm mt-1">Pricing & Revenue Intelligence Dashboard v2.4</p>
        </div>
        <div className="flex items-center gap-4 bg-white/10 p-2 rounded-lg border border-white/20">
          <span className={`text-sm font-bold ${!isOptimized ? 'text-white' : 'text-slate-400'}`}>Fragmented</span>
          <button 
            onClick={() => setIsOptimized(!isOptimized)}
            className="w-14 h-7 bg-white/20 rounded-full relative p-1 transition-all"
          >
            <div className={`w-5 h-5 bg-[#D4AF37] rounded-full transition-all transform ${isOptimized ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-bold ${isOptimized ? 'text-[#D4AF37]' : 'text-slate-400'}`}>Cluster-Optimized</span>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard 
            title="Revenue per Van-Hour" 
            value={`₹${metrics.rvh}`} 
            icon={<TrendingUp className="text-blue-600" />}
            subtitle="Efficiency Target: ₹2,500+"
            trend={isOptimized ? "+133%" : "-42%"}
          />
          <KpiCard 
            title="Daily Appointments" 
            value={metrics.dailyAppts} 
            icon={<Users className="text-amber-600" />}
            subtitle="Capacity utilization"
          />
          <KpiCard 
            title="Net Profit Margin" 
            value={`${metrics.margin}%`} 
            icon={<DollarSign className="text-emerald-600" />}
            subtitle="Post OPEX & Logistics Tax"
          />
          <KpiCard 
            title="AOV (Groom + Med)" 
            value={`₹${metrics.aov}`} 
            icon={<Zap className="text-purple-600" />}
            subtitle="Gateway conversion rate"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="text-slate-400" /> Monthly Revenue & Profit Comparison
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                    />
                    <Legend />
                    <Bar dataKey="fragmented" name="Fragmented Model" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="optimized" name="Cluster Model" fill="#002D62" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Geographic Cluster Visualization (Mock) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-slate-400" /> Neighborhood Cluster Visualization
              </h3>
              <div className="relative h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                 {isOptimized ? (
                   <div className="text-center">
                     <div className="relative inline-block">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-150 animate-pulse" />
                        <MapPin className="w-12 h-12 text-[#002D62] relative z-10 mx-auto" />
                     </div>
                     <p className="mt-4 font-bold text-slate-700">High Density 'Pet Corridor' Detected</p>
                     <p className="text-sm text-slate-500">8 appointments within 800m radius (HSR Layout Cluster)</p>
                   </div>
                 ) : (
                   <div className="w-full h-full p-8 grid grid-cols-4 gap-4 opacity-40">
                      {[...Array(8)].map((_, i) => (
                        <MapPin key={i} className="text-slate-400" style={{
                          marginTop: Math.random() * 100,
                          marginLeft: Math.random() * 50
                        }} />
                      ))}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="bg-white px-4 py-2 rounded-full shadow-lg font-bold text-red-500 flex items-center gap-2">
                          <AlertTriangle size={18} /> Logistics Tax: 42% Travel Overhead
                        </p>
                      </div>
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Clock className="text-slate-400" /> Time Utilization
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timeDistribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {timeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                 <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#002D62]" /> Service</span>
                    <span className="font-bold">{isOptimized ? '85%' : '45%'}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D4AF37]" /> Travel</span>
                    <span className="font-bold text-amber-600">{isOptimized ? '10%' : '45%'}</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#002D62] text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="text-[#D4AF37]" /> Strategic Validation
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 border-[#D4AF37] pl-4 py-1">
                  <p className="text-xs text-slate-300 uppercase tracking-widest">Efficiency Status</p>
                  <p className="text-xl font-bold">{metrics.status}</p>
                </div>
                <div className="border-l-2 border-slate-400 pl-4 py-1">
                  <p className="text-xs text-slate-300 uppercase tracking-widest">Logistics Tax</p>
                  <p className={`text-xl font-bold ${isOptimized ? 'text-emerald-400' : 'text-red-400'}`}>{metrics.logisticsTax}</p>
                </div>
                <div className="pt-4 border-t border-white/10 mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">CLV Projection:</span>
                    <span className="font-bold text-[#D4AF37]">{metrics.clv}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Unit CAC:</span>
                    <span className="font-bold text-emerald-400">{metrics.cac}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <Info className="text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Analyst Note:</strong> Cluster optimization assumes the 20/2 rule (20 clients per 2km radius). Failure to hit this density results in a return to fragmented margins.
            </p>
          </div>
          <div className="flex gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <CheckCircle2 className="text-blue-600 shrink-0" />
            <p className="text-sm text-blue-800">
              <strong>Target Secured:</strong> Current HSR Layout cluster has reached 14 anchor clients.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 flex flex-col justify-center">
            <p className="text-xs text-slate-400 uppercase font-bold">Data Authenticity</p>
            <p className="text-sm text-slate-600">Bala Bharath Kumar Pavuluri | M036-24</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const KpiCard = ({ title, value, icon, subtitle, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col relative overflow-hidden group hover:border-[#D4AF37] transition-colors">
    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
      {React.cloneElement(icon, { size: 64 })}
    </div>
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-slate-50 rounded-lg">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">{title}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <h2 className="text-3xl font-bold text-slate-800">{value}</h2>
      {trend && <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{trend}</span>}
    </div>
    <p className="text-xs text-slate-400 mt-2 italic">{subtitle}</p>
  </div>
);

export default App;