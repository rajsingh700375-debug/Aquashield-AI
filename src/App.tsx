import { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  Cpu,
  Droplets,
  Gauge,
  LayoutDashboard,
  Menu,
  MapPin,
  MoreHorizontal,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wifi,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import monjit from '@/assets/images/leadership/Founder-1_Monjit_Singh.jpeg';
import siddhartha from '@/assets/images/leadership/Founder_-2_Siddhartha_Paul.jpeg';

type View = 'home' | 'technology' | 'command' | 'monitor' | 'alerts' | 'maintenance' | 'insights' | 'efficiency';
type Modal = 'asset' | 'work-order' | 'investigate' | 'report' | null;

type Asset = {
  id: string;
  name: string;
  location: string;
  status: 'Healthy' | 'Attention' | 'Critical';
  flow: string;
  risk: number;
  loss: string;
};

const assets: Asset[] = [
  { id: 'TAP-127', name: 'Platform 3 drinking point', location: 'Kolkata Central', status: 'Critical', flow: '3.4 L/min', risk: 87, loss: '468 L' },
  { id: 'TAP-027', name: 'Concourse east tap', location: 'Kolkata Central', status: 'Attention', flow: '1.8 L/min', risk: 42, loss: '112 L' },
  { id: 'TANK-04', name: 'North elevated tank', location: 'Station East', status: 'Critical', flow: '—', risk: 81, loss: '—' },
  { id: 'TOILET-A', name: 'Public sanitation block A', location: 'Kolkata Central', status: 'Attention', flow: '2.1 L/min', risk: 58, loss: '204 L' },
  { id: 'PIPE-12', name: 'Platform supply line', location: 'Municipal Facility', status: 'Attention', flow: '18.2 L/min', risk: 68, loss: '—' },
];

const navItems: { label: string; view: View; icon: typeof LayoutDashboard }[] = [
  { label: 'Overview', view: 'command', icon: LayoutDashboard },
  { label: 'Live Monitoring', view: 'monitor', icon: Radio },
  { label: 'Alerts', view: 'alerts', icon: AlertTriangle },
  { label: 'Maintenance', view: 'maintenance', icon: Wrench },
  { label: 'AI Insights', view: 'insights', icon: Sparkles },
  { label: 'Efficiency', view: 'efficiency', icon: Gauge },
];

const metrics = [
  { label: 'Assets monitored', value: '1,284', detail: '+8.4% this month', icon: Radio, tone: 'aqua' },
  { label: 'Healthy assets', value: '1,231', detail: '95.9% of network', icon: ShieldCheck, tone: 'green' },
  { label: 'Maintenance required', value: '42', detail: '7 high priority', icon: Wrench, tone: 'amber' },
  { label: 'Critical alerts', value: '11', detail: 'Needs attention now', icon: AlertTriangle, tone: 'red' },
];

const liveTickerMessages = [
  'TAP-127 continuous flow detected · 3.4 L/min',
  'TANK-04 overflow risk elevated · 81%',
  '18,420 L water loss prevented this month',
  'TAP-027 unusual consumption pattern flagged',
  'PIPE-12 pressure anomaly under analysis',
  'Network availability holding at 96.2%',
  'TOILET-A high usage pattern detected',
  'AI model updated risk score for TAP-127',
  'Maintenance Team B dispatched to Platform 3',
  'Efficiency index improved to 82/100',
];

function useLiveNumber(base: number, variance: number, intervalMs: number) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((prev) => {
        const delta = Math.round((Math.random() - 0.5) * variance);
        const next = prev + delta;
        return Math.max(base - variance, Math.min(base + variance, next));
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [base, variance, intervalMs]);
  return value;
}

function useRotatingIndex(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [length, intervalMs]);
  return index;
}

function App() {
  const [view, setView] = useState<View>('home');
  const [modal, setModal] = useState<Modal>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [investigationStep, setInvestigationStep] = useState(0);

  const openAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setModal('asset');
  };

  const startInvestigation = () => {
    setModal('investigate');
    setInvestigationStep(0);
    const interval = window.setInterval(() => {
      setInvestigationStep((step) => {
        if (step >= 9) {
          window.clearInterval(interval);
          return 9;
        }
        return step + 1;
      });
    }, 650);
  };

  const navigate = (nextView: View) => {
    setView(nextView);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'home') {
    return <CorporateHome onExplore={() => navigate('command')} onCommand={() => navigate('command')} onNavigate={navigate} onTechnology={() => navigate('technology')} />;
  }

  if (view === 'technology') {
    return <TechnologyPage onBack={() => navigate('home')} onCommand={() => navigate('command')} />;
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <button className="brand brand-sidebar" onClick={() => navigate('home')} aria-label="Return to AQUASHIELD homepage">
          <span className="brand-mark"><Droplets size={19} /></span>
          <span>AQUASHIELD <b>AI</b></span>
        </button>
        <div className="workspace-label">COMMAND CENTER</div>
        <div className="facility-select">
          <span className="facility-dot" />
          <span><small>Monitoring</small><strong>Kolkata Central</strong></span>
          <ChevronDown size={15} />
        </div>
        <nav className="side-nav" aria-label="Command center navigation">
          {navItems.map(({ label, view: itemView, icon: Icon }) => (
            <button key={label} className={view === itemView ? 'active' : ''} onClick={() => navigate(itemView)}>
              <Icon size={17} /><span>{label}</span>{label === 'Alerts' && <em>11</em>}
            </button>
          ))}
          <div className="nav-divider" />
          <button onClick={() => setModal('report')}><BarChart3 size={17} /><span>Reports</span></button>
          <button onClick={() => setModal('report')}><Bell size={17} /><span>Notifications</span><i /></button>
          <button onClick={() => setModal('report')}><Users size={17} /><span>Team</span></button>
          <button onClick={() => setModal('report')}><Settings size={17} /><span>Settings</span></button>
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">AA</div><span><small>Signed in as</small><strong>Authority Admin</strong></span><MoreHorizontal size={17} />
        </div>
      </aside>

      <main className="command-main">
        <header className="command-header">
          <button className="mobile-menu" onClick={() => setMobileMenu((open) => !open)} aria-label="Toggle menu"><Menu /></button>
          <div className="breadcrumb"><button onClick={() => navigate('home')}>AQUASHIELD AI</button><span>/</span><strong>{navItems.find((item) => item.view === view)?.label ?? 'Overview'}</strong></div>
          <div className="header-actions"><div className="live-status"><span /> All systems operational</div><button className="icon-button" aria-label="Search"><Search size={18} /></button><button className="icon-button notification-icon" aria-label="Notifications" onClick={() => navigate('alerts')}><Bell size={18} /><i /></button><button className="header-profile" onClick={() => setModal('report')}><span className="avatar small">AA</span><ChevronDown size={15} /></button></div>
        </header>
        <div className="command-content">
          {view === 'command' && <Overview onAsset={openAsset} onInvestigate={startInvestigation} onNavigate={navigate} />}
          {view === 'monitor' && <Monitoring onAsset={openAsset} />}
          {view === 'alerts' && <Alerts onAsset={openAsset} onInvestigate={startInvestigation} />}
          {view === 'maintenance' && <Maintenance onAsset={openAsset} onWorkOrder={() => setModal('work-order')} />}
          {view === 'insights' && <Insights onInvestigate={startInvestigation} onAsset={openAsset} />}
          {view === 'efficiency' && <Efficiency />}
        </div>
      </main>
      {modal && <ModalLayer modal={modal} asset={selectedAsset} step={investigationStep} onClose={() => setModal(null)} onWorkOrder={() => setModal('work-order')} onAsset={openAsset} />}
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
      <ArrowUp size={20} />
    </button>
  );
}

function LiveTicker() {
  const index = useRotatingIndex(liveTickerMessages.length, 3200);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(false);
    const id = window.setTimeout(() => setVisible(true), 250);
    return () => window.clearTimeout(id);
  }, [index]);
  return (
    <div className="live-ticker">
      <span className="ticker-badge"><Radio size={11} /> LIVE</span>
      <span className={`ticker-text ${visible ? 'ticker-in' : 'ticker-out'}`}>{liveTickerMessages[index]}</span>
    </div>
  );
}

function RotatingHeroMessage() {
  const messages = ['Stronger public services.', 'Less water loss.', 'Faster maintenance.', 'Smarter cities.'];
  const index = useRotatingIndex(messages.length, 2800);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(false);
    const id = window.setTimeout(() => setVisible(true), 180);
    return () => window.clearTimeout(id);
  }, [index]);
  return <em className={`hero-message ${visible ? 'hero-message-visible' : 'hero-message-hidden'}`} key={messages[index]}>{messages[index]}</em>;
}

function CorporateHome({ onExplore, onCommand, onNavigate, onTechnology }: { onExplore: () => void; onCommand: () => void; onNavigate: (view: View) => void; onTechnology: () => void }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span className="brand-mark"><Droplets size={19} /></span><span>AQUASHIELD <b>AI</b></span></button>
        <nav className={menu ? 'site-nav site-nav-open' : 'site-nav'}>
          <a href="#solutions">Solutions</a>
          <a href="#workflow">How it works</a>
          <button className="nav-link-button" onClick={onTechnology}>Technology</button>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="site-actions"><button className="text-button" onClick={onCommand}>Command Center <ArrowRight size={15} /></button><button className="menu-button" onClick={() => setMenu((open) => !open)} aria-label="Open navigation"><Menu size={20} /></button></div>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> AI-POWERED WATER INFRASTRUCTURE</div>
          <h1>Smarter water infrastructure.<br /><RotatingHeroMessage /></h1>
          <p>AQUASHIELD AI brings real-time monitoring, intelligent anomaly detection and predictive maintenance together to help organizations operate public infrastructure more efficiently.</p>
          <div className="hero-buttons"><button className="button button-primary" onClick={onExplore}>Explore AQUASHIELD <ArrowRight size={17} /></button><button className="button button-secondary" onClick={onCommand}>Open Command Center <LayoutDashboard size={16} /></button></div>
          <div className="hero-proof"><div className="proof-avatars"><span>RA</span><span>MC</span><span>PU</span></div><span>Built for teams managing<br /><b>distributed public infrastructure</b></span></div>
        </div>
        <HeroDashboard onCommand={onCommand} />
      </section>
      <LiveTicker />
      <div className="trust-strip"><span>OPERATIONAL INTELLIGENCE FOR</span><b>RAILWAYS</b><b>MUNICIPALITIES</b><b>PUBLIC UTILITIES</b><b>SMART CITIES</b><b>PUBLIC FACILITIES</b></div>
      <section className="problem-section section"><div className="section-kicker">THE VISIBILITY GAP</div><h2>Public water infrastructure shouldn't need a complaint to become visible.</h2><p className="section-lead">When problems stay invisible, teams are forced into reactive maintenance. AQUASHIELD creates the operational layer that turns signals into confident action.</p><div className="problem-grid">{[['Invisible leakage','Water can continue flowing without immediate human visibility.','01'],['Reactive maintenance','Teams often respond after a complaint or physical inspection.','02'],['Distributed assets','Hundreds of taps and facilities are difficult to monitor manually.','03'],['No closed loop','A repair may happen without measurable verification.','04']].map(([title, text, num]) => <div className="problem-card" key={title}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowRight size={17} /></div>)}</div></section>
      <section className="comparison-section section"><div className="comparison-copy"><div className="section-kicker">A BETTER OPERATING MODEL</div><h2>From reactive maintenance to verified impact.</h2><p>Replace delay and guesswork with a continuous loop of sensing, intelligence, action and verification.</p><button className="button button-primary" onClick={onExplore}>See the platform <ArrowRight size={16} /></button></div><div className="comparison-card"><div className="comparison-column traditional"><span className="compare-label">TRADITIONAL</span>{['Complaint','Inspection','Discovery','Repair','Unknown result'].map((item, index) => <div className="compare-step" key={item}><i>{index + 1}</i><span>{item}</span>{index < 4 && <b>↓</b>}</div>)}</div><div className="comparison-column aqua-column"><span className="compare-label">AQUASHIELD AI</span>{['Sensor','Detection','AI analysis','Priority','Work order','Repair','Verification','Measured impact'].map((item, index) => <div className="compare-step" key={item}><i>{String(index + 1).padStart(2, '0')}</i><span>{item}</span>{index < 7 && <b>↓</b>}</div>)}</div></div></section>
      <section className="workflow-section" id="workflow"><div className="section centered"><div className="section-kicker">THE AQUASHIELD LOOP</div><h2>From detection to verified action.</h2><p className="section-lead">Every intervention becomes a measurable improvement to the network.</p><div className="workflow-grid">{['Detect','Analyze','Prioritize','Assign','Repair','Verify','Measure'].map((step, index) => <div className="workflow-item" key={step}><span>0{index + 1}</span><div className="workflow-icon">{[Radio, Sparkles, Target, Users, Wrench, ShieldCheck, BarChart3][index] && (() => { const Icon = [Radio, Sparkles, Target, Users, Wrench, ShieldCheck, BarChart3][index]; return <Icon size={21} />; })()}</div><h3>{step}</h3><p>{['Continuous monitoring identifies abnormal behavior.','Understand patterns against historical behavior.','Calculate severity, urgency and impact.','Route work to the right maintenance team.','Existing teams intervene with context.','Sensor data confirms normal operation.','Calculate the resulting water-loss reduction.'][index]}</p></div>)}</div></div></section>
      <section className="capability-section section" id="solutions"><div className="capability-intro"><div className="section-kicker">ONE OPERATIONAL LAYER</div><h2>Intelligence for every part of the water network.</h2><p>Monitor assets, understand behavior and make maintenance measurable across a single operational view.</p><button className="text-link" onClick={onExplore}>Explore the Command Center <ArrowRight size={16} /></button></div><div className="capability-list">{([{ title: 'Smart leak detection', text: 'Continuous flow, pressure and usage behavior identify issues before they become complaints.', Icon: Droplets }, { title: 'Abnormal usage intelligence', text: 'Understand unusual timing, volume and frequency without confusing an anomaly with proof.', Icon: Activity }, { title: 'Predictive maintenance', text: 'Asset risk scores help teams decide what deserves attention next.', Icon: Zap }, { title: 'Water efficiency intelligence', text: 'A clear 0–100 score connects asset health to the water impact of every intervention.', Icon: Gauge }] as const).map(({ title, text, Icon }, index) => <button className="capability-row" key={title} onClick={onExplore}><span className="capability-number">0{index + 1}</span><span className="capability-icon"><Icon size={20} /></span><span><h3>{title}</h3><p>{text}</p></span><ArrowRight size={18} /></button>)}</div></section>
      <section className="story-section section" id="about"><div className="story-panel"><div><div className="section-kicker">BUILT FOR THE PEOPLE WHO KEEP CITIES MOVING</div><h2>We don't replace maintenance workers. We replace the delay before they repair the problem.</h2><p>Operational intelligence gives field teams the context to move with confidence — what is happening, where it is happening, how serious it is and whether the fix worked.</p><button className="button button-light" onClick={() => onNavigate('maintenance')}>Meet the workflow <ArrowRight size={16} /></button></div><div className="story-stat"><strong>7×</strong><span>questions answered before a team reaches the asset</span></div></div></section>
      <section className="leadership-section section"><div className="section-kicker">THE TEAM BEHIND THE PLATFORM</div><h2>Building intelligence for every drop.</h2><div className="leader-grid"><div className="leader-card"><img src={monjit} alt="Monjit Singh" /><div><span>FOUNDER</span><h3>Monjit Singh</h3><p>Business strategy, product vision and translating public infrastructure challenges into scalable technology.</p></div></div><div className="leader-card"><img src={siddhartha} alt="Siddhartha Paul" /><div><span>FOUNDER</span><h3>Siddhartha Paul</h3><p>IoT architecture, analytics and transforming infrastructure data into actionable intelligence.</p></div></div></div></section>
      <section className="cta-section" id="contact"><div className="section-kicker">MAKE THE INVISIBLE VISIBLE</div><h2>Every drop has a story.<br /><em>AQUASHIELD AI makes it visible.</em></h2><p>Intelligent monitoring. Proactive maintenance. Measurable water efficiency.</p><button className="button button-primary" onClick={onExplore}>Explore AQUASHIELD AI <ArrowRight size={17} /></button></section>
      <footer className="site-footer"><div className="brand"><span className="brand-mark"><Droplets size={19} /></span><span>AQUASHIELD <b>AI</b></span></div><span>Smart public water & sanitation infrastructure</span><span>© 2026 AQUASHIELD AI. All rights reserved.</span></footer>
      <BackToTop />
    </div>
  );
}

function HeroDashboard({ onCommand }: { onCommand: () => void }) {
  const assetsMonitored = useLiveNumber(1284, 6, 2500);
  const healthyAssets = useLiveNumber(1231, 5, 3000);
  const efficiencyScore = useLiveNumber(82, 2, 4000);
  const criticalAlerts = useLiveNumber(11, 2, 5000);
  const waterLoss = useLiveNumber(18420, 120, 2200);
  const availability = useLiveNumber(962, 3, 3500);
  const flowRate = useLiveNumber(34, 8, 1800);
  const markerIndex = useRotatingIndex(5, 2800);
  const [clock, setClock] = useState('10:42 AM');
  useEffect(() => {
    const id = window.setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);
  const markers = [['18%', '27%', 'green', 'TAP-001'], ['50%', '48%', 'red', 'TAP-127'], ['72%', '25%', 'green', 'TANK-04'], ['30%', '70%', 'amber', 'TOILET-A'], ['80%', '67%', 'green', 'PIPE-12']] as const;
  return (
    <div className="hero-dashboard" onClick={onCommand} role="button" tabIndex={0}>
      <div className="dash-top"><span className="dash-window"><i /><i /><i /></span><span className="dash-title">AQUASHIELD <b>COMMAND CENTER</b></span><span className="dash-time">09 AUG 2026 · {clock}</span></div>
      <div className="dash-body">
        <div className="dash-map">
          <div className="map-grid" />
          {markers.map(([left, top, color, label], index) => (
            <button className={`map-marker ${color} ${index === markerIndex ? 'marker-active' : ''}`} style={{ left, top }} key={label} aria-label={`View ${label}`}>
              <span /><small>{label}</small>
            </button>
          ))}
          <div className="map-route route-one" /><div className="map-route route-two" />
          <div className="map-caption"><MapPin size={14} /> Kolkata Central · 126 assets</div>
        </div>
        <div className="dash-side">
          <div className="mini-label">NETWORK STATUS <span className="status-pill"><i /> LIVE</span></div>
          <div className="dash-side-title">Everything under<br /><strong>intelligent watch.</strong></div>
          <div className="dash-number-row">
            <div><strong>{assetsMonitored.toLocaleString()}</strong><span>assets monitored</span></div>
            <div><strong>{efficiencyScore}</strong><span>efficiency index</span></div>
          </div>
          <div className="dash-alert">
            <div className="alert-icon"><AlertTriangle size={15} /></div>
            <div><span>CRITICAL ALERT</span><strong>TAP-127 · {flowRate / 10} L/min flow</strong><small>AI recommends inspection within 48 hours</small></div>
          </div>
          <button className="dash-action" onClick={onCommand}>Open live operations <ArrowRight size={14} /></button>
        </div>
      </div>
      <div className="dash-bottom">
        <span><i className="dot green-dot" /> {healthyAssets.toLocaleString()} healthy</span>
        <span><i className="dot amber-dot" /> 42 attention</span>
        <span><i className="dot red-dot" /> {criticalAlerts} critical</span>
        <span className="dash-availability"><Activity size={13} /> {(availability / 10).toFixed(1)}% availability</span>
      </div>
    </div>
  );
}

function TechnologyPage({ onBack, onCommand }: { onBack: () => void; onCommand: () => void }) {
  const layers = [
    { name: 'Sensor Layer', icon: Droplets, color: 'aqua', items: ['Flow sensors', 'Pressure sensors', 'Water level sensors', 'Leak detectors', 'Optional water quality'] },
    { name: 'Edge', icon: Cpu, color: 'blue', items: ['Industrial controller', 'Local data buffering', 'Edge processing'] },
    { name: 'Connectivity', icon: Wifi, color: 'teal', items: ['LoRaWAN', 'NB-IoT', '4G LTE', 'Wi-Fi'] },
    { name: 'Cloud', icon: LayoutDashboard, color: 'navy', items: ['IoT platform', 'Data processing', 'Database', 'Alert engine'] },
    { name: 'AI', icon: Sparkles, color: 'purple', items: ['Anomaly detection', 'Predictive maintenance', 'Risk scoring', 'Efficiency analytics'] },
    { name: 'Operations', icon: ShieldCheck, color: 'green', items: ['Command center', 'Maintenance workflow', 'Reports', 'Decision support'] },
  ];
  const [activeLayer, setActiveLayer] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % layers.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [layers.length]);
  return (
    <div className="site-shell">
      <header className="site-header tech-header">
        <button className="brand" onClick={onBack}><span className="brand-mark"><Droplets size={19} /></span><span>AQUASHIELD <b>AI</b></span></button>
        <nav className="site-nav"><button className="nav-link-button" onClick={onBack}>Home</button><button className="nav-link-button" onClick={onCommand}>Command Center</button></nav>
        <div className="site-actions"><button className="text-button" onClick={onCommand}>Command Center <ArrowRight size={15} /></button></div>
      </header>
      <section className="tech-hero">
        <div className="tech-hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> ARCHITECTURE</div>
          <h1>From sensor to decision.<br /><em>One intelligent stack.</em></h1>
          <p>AQUASHIELD AI connects physical water infrastructure to cloud intelligence through a layered architecture designed for reliability, scalability and operational clarity.</p>
          <button className="button button-primary" onClick={onCommand}>Open Command Center <ArrowRight size={16} /></button>
        </div>
      </section>
      <section className="tech-architecture section">
        <div className="section-kicker">SYSTEM ARCHITECTURE</div>
        <h2>Six layers of operational intelligence.</h2>
        <p className="section-lead">Each layer plays a distinct role in moving water-infrastructure data from the physical world to confident operational decisions.</p>
        <div className="arch-diagram">
          {layers.map((layer, index) => (
            <div className={`arch-layer ${index === activeLayer ? 'arch-active' : ''}`} key={layer.name} onMouseEnter={() => setActiveLayer(index)}>
              <div className={`arch-layer-icon ${layer.color}`}><layer.icon size={22} /></div>
              <div className="arch-layer-body">
                <span className="arch-layer-num">0{index + 1}</span>
                <h3>{layer.name}</h3>
                <div className="arch-items">{layer.items.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              {index < layers.length - 1 && <div className="arch-connector"><ArrowRight size={18} /></div>}
            </div>
          ))}
        </div>
      </section>
      <section className="tech-hardware section">
        <div className="section-kicker">HARDWARE</div>
        <h2>AQUASHIELD Node</h2>
        <p className="section-lead">A weatherproof industrial device that combines sensing, processing and communication into a single deployment-ready unit.</p>
        <div className="hardware-grid">
          <div className="hardware-device">
            <div className="device-screen">
              <div className="device-line"><Droplets size={14} /> Flow sensor</div>
              <div className="device-line"><Gauge size={14} /> Pressure sensor</div>
              <div className="device-line"><Cpu size={14} /> IoT controller</div>
              <div className="device-line"><Wifi size={14} /> Communication module</div>
              <div className="device-line"><Zap size={14} /> Power system</div>
              <div className="device-line"><ShieldCheck size={14} /> Weatherproof enclosure</div>
            </div>
            <div className="device-label">AQUASHIELD NODE</div>
          </div>
          <div className="hardware-specs">
            <h3>Technical specifications</h3>
            <div className="spec-row"><span>Connectivity</span><strong>LoRaWAN · NB-IoT · 4G · Wi-Fi</strong></div>
            <div className="spec-row"><span>Power</span><strong>Solar + battery backup</strong></div>
            <div className="spec-row"><span>Enclosure</span><strong>IP65 weatherproof</strong></div>
            <div className="spec-row"><span>Sensors</span><strong>Flow, pressure, level, leak</strong></div>
            <div className="spec-row"><span>Processing</span><strong>Edge + cloud hybrid</strong></div>
            <div className="spec-row"><span>Deployment</span><strong>Retrofittable to existing assets</strong></div>
          </div>
        </div>
      </section>
      <section className="cta-section"><div className="section-kicker">READY TO DEPLOY</div><h2>Intelligence for every drop.</h2><p>See the architecture in action.</p><button className="button button-primary" onClick={onCommand}>Enter Command Center <ArrowRight size={17} /></button></section>
      <footer className="site-footer"><div className="brand"><span className="brand-mark"><Droplets size={19} /></span><span>AQUASHIELD <b>AI</b></span></div><span>Smart public water & sanitation infrastructure</span><span>© 2026 AQUASHIELD AI. All rights reserved.</span></footer>
      <BackToTop />
    </div>
  );
}

function PageHeader({ kicker, title, copy, action }: { kicker: string; title: string; copy: string; action?: React.ReactNode }) { return <div className="page-header"><div><div className="section-kicker">{kicker}</div><h1>{title}</h1><p>{copy}</p></div>{action}</div> }
function MetricCards() {
  const monitored = useLiveNumber(1284, 8, 2200);
  const healthy = useLiveNumber(1231, 7, 2600);
  const maintenance = useLiveNumber(42, 3, 3000);
  const critical = useLiveNumber(11, 2, 3400);
  const liveMetrics = [
    { ...metrics[0], value: monitored.toLocaleString(), detail: '+8.4% this month' },
    { ...metrics[1], value: healthy.toLocaleString(), detail: `${((healthy / monitored) * 100).toFixed(1)}% of network` },
    { ...metrics[2], value: String(maintenance), detail: `${Math.max(4, Math.round(maintenance / 6))} high priority` },
    { ...metrics[3], value: String(critical), detail: 'Needs attention now' },
  ];
  return <div className="metric-grid">{liveMetrics.map(({ label, value, detail, icon: Icon, tone }) => <button className="metric-card" key={label}><div className={`metric-icon ${tone}`}><Icon size={18} /></div><div><span>{label}</span><strong className="live-value">{value}</strong><small className={tone === 'red' ? 'critical-text' : ''}>{detail}</small></div><ArrowRight size={16} /></button>)}</div>;
}
function Overview({ onAsset, onInvestigate, onNavigate }: { onAsset: (asset: Asset) => void; onInvestigate: () => void; onNavigate: (view: View) => void }) { return <><PageHeader kicker="NETWORK OVERVIEW · 09 AUG 2026" title="Good morning, Administrator." copy="Here is what is happening across your water infrastructure today." action={<button className="button dark-button" onClick={onInvestigate}><Sparkles size={16} /> Investigate anomaly</button>} /><MetricCards /><div className="overview-grid"><section className="panel network-panel"><div className="panel-header"><div><span className="panel-kicker">LIVE NETWORK</span><h2>Infrastructure at a glance</h2></div><button className="panel-link" onClick={() => onNavigate('monitor')}>View live map <ArrowRight size={14} /></button></div><div className="network-map"><div className="map-grid" />{[['12%', '36%', 'green', 'TAP-001'], ['45%', '52%', 'red', 'TAP-127'], ['73%', '22%', 'green', 'TANK-04'], ['31%', '76%', 'amber', 'TOILET-A'], ['78%', '68%', 'green', 'PIPE-12'], ['60%', '75%', 'green', 'TAP-083']].map(([left, top, color, label]) => <button className={`map-marker ${color}`} style={{ left, top }} onClick={() => onAsset(assets.find((asset) => asset.id === label) ?? assets[0])} key={label}><span /><small>{label}</small></button>)}<div className="map-route route-one" /><div className="map-route route-two" /><div className="network-map-footer"><span><MapPin size={14} /> Kolkata Central</span><span>126 assets <b>·</b> 14 zones</span></div></div></section><section className="panel insight-panel"><div className="panel-header"><div><span className="panel-kicker">AI PRIORITY QUEUE</span><h2>What needs attention</h2></div><button className="icon-button"><MoreHorizontal size={17} /></button></div><div className="priority-list">{assets.slice(0, 4).map((asset) => <button className="priority-row" key={asset.id} onClick={() => onAsset(asset)}><span className={`priority-status ${asset.status.toLowerCase()}`} /><span><strong>{asset.id}</strong><small>{asset.name}</small></span><span className="priority-risk"><b>{asset.risk}%</b><small>risk</small></span><ArrowRight size={14} /></button>)}</div><button className="panel-bottom-action" onClick={() => onNavigate('insights')}>See all AI insights <ArrowRight size={14} /></button></section></div><section className="panel activity-panel"><div className="panel-header"><div><span className="panel-kicker">WATER IMPACT · LAST 30 DAYS</span><h2>Loss prevented is trending up</h2></div><button className="filter-button">30 days <ChevronDown size={14} /></button></div><div className="chart-wrap"><div className="chart-y"><span>20k L</span><span>15k L</span><span>10k L</span><span>5k L</span><span>0</span></div><div className="chart"><div className="chart-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 720 180" preserveAspectRatio="none" aria-label="Water loss prevented trend"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#12b8b0" stopOpacity=".28" /><stop offset="100%" stopColor="#12b8b0" stopOpacity="0" /></linearGradient></defs><path d="M0 148 C45 140 55 146 88 120 S132 135 170 106 S210 115 248 95 S290 115 326 80 S370 98 408 72 S455 94 486 60 S525 82 564 54 S600 68 638 34 S682 60 720 18 V180 H0 Z" fill="url(#chart-fill)" /><path d="M0 148 C45 140 55 146 88 120 S132 135 170 106 S210 115 248 95 S290 115 326 80 S370 98 408 72 S455 94 486 60 S525 82 564 54 S600 68 638 34 S682 60 720 18" fill="none" stroke="#12b8b0" strokeWidth="3" /></svg><div className="chart-x"><span>11 Jul</span><span>18 Jul</span><span>25 Jul</span><span>01 Aug</span><span>08 Aug</span></div></div><div className="chart-total"><strong>18,420 L</strong><span>estimated water loss prevented</span><b>+18.4% <small>vs previous period</small></b></div></div></section></> }

function Monitoring({ onAsset }: { onAsset: (asset: Asset) => void }) {
  const monitored = useLiveNumber(1284, 8, 2200);
  const healthy = useLiveNumber(1231, 7, 2600);
  const attention = useLiveNumber(42, 3, 2800);
  const critical = useLiveNumber(11, 2, 3200);
  return <><PageHeader kicker="LIVE MONITORING" title="A live view of every asset." copy="Follow infrastructure health across facilities and investigate signals as they happen." action={<button className="button dark-button"><Radio size={16} /> Live stream active</button>} /><div className="monitor-toolbar"><div className="search-field"><Search size={16} /><input placeholder="Search asset, facility or zone" /></div><button className="filter-button">All statuses <ChevronDown size={14} /></button><div className="monitor-legend"><span><i className="dot green-dot" /> Healthy {healthy.toLocaleString()}</span><span><i className="dot amber-dot" /> Attention {attention}</span><span><i className="dot red-dot" /> Critical {critical}</span></div></div><div className="monitor-layout"><div className="panel full-map"><div className="network-map large"><div className="map-grid" />{assets.map((asset, index) => <button className={`map-marker ${asset.status.toLowerCase()}`} style={{ left: `${18 + index * 15}%`, top: `${28 + (index % 3) * 20}%` }} onClick={() => onAsset(asset)} key={asset.id}><span /><small>{asset.id}</small></button>)}<div className="map-route route-one" /><div className="map-route route-two" /><div className="map-caption"><MapPin size={14} /> Kolkata Central · {monitored.toLocaleString()} assets live</div></div></div><div className="panel asset-list"><div className="panel-header"><div><span className="panel-kicker">ASSET DIRECTORY</span><h2>Recent signals</h2></div></div>{assets.map((asset) => <button className="asset-list-row" onClick={() => onAsset(asset)} key={asset.id}><span className={`priority-status ${asset.status.toLowerCase()}`} /><span><strong>{asset.id}</strong><small>{asset.location}</small></span><span className="asset-flow">{asset.flow}</span><ArrowRight size={14} /></button>)}</div></div></> }

function Alerts({ onAsset, onInvestigate }: { onAsset: (asset: Asset) => void; onInvestigate: () => void }) { const alertCount = useLiveNumber(11, 2, 3000); const highCount = useLiveNumber(7, 2, 3400); const mediumCount = useLiveNumber(24, 3, 3800); const resolvedCount = useLiveNumber(84, 4, 4200); const newestAlertMinutes = useLiveNumber(4, 2, 2400); const alertRows = [{ asset: assets[0], text: 'Continuous abnormal flow', priority: 'Critical', time: '4 min ago' }, { asset: assets[2], text: 'Overflow risk detected', priority: 'Critical', time: '18 min ago' }, { asset: assets[1], text: 'Unusual consumption pattern', priority: 'High', time: '42 min ago' }, { asset: assets[3], text: 'High water usage', priority: 'Medium', time: '1 hr ago' }, { asset: assets[4], text: 'Pressure anomaly', priority: 'Medium', time: '2 hrs ago' }]; return <><PageHeader kicker="ALERT CENTER" title="Signals that need a decision." copy="Prioritized by urgency, estimated impact and the health of the asset." action={<button className="button dark-button" onClick={onInvestigate}><Sparkles size={16} /> Investigate anomaly</button>} /><div className="alert-tabs"><button className="active">All <b>{alertCount}</b></button><button>Critical <b>{alertCount}</b></button><button>High <b>{highCount}</b></button><button>Medium <b>{mediumCount}</b></button><button>Resolved <b>{resolvedCount}</b></button></div><section className="panel alert-table">{alertRows.map(({ asset, text, priority, time }) => <button className="alert-row" key={asset.id} onClick={() => onAsset(asset)}><span className={`alert-severity ${priority.toLowerCase()}`}><AlertTriangle size={15} /></span><span className="alert-main"><strong>{asset.id}</strong><span>{text}</span></span><span className="alert-location"><MapPin size={13} />{asset.location}</span><span className={`priority-tag ${priority.toLowerCase()}`}>{priority}</span><span className="alert-time">{asset.id === 'TAP-127' ? `${newestAlertMinutes} min ago` : time}</span><ArrowRight size={15} /></button>)}</section></> }

function Maintenance({ onAsset, onWorkOrder }: { onAsset: (asset: Asset) => void; onWorkOrder: () => void }) { const newCount = useLiveNumber(6, 2, 3000); const assignedCount = useLiveNumber(9, 2, 3400); const progressCount = useLiveNumber(4, 1, 3800); const verificationCount = useLiveNumber(3, 1, 4200); const resolvedCount = useLiveNumber(28, 2, 4600); const columns = [{ title: 'New', count: newCount, color: 'blue', cards: [{ id: 'AQ-1032', asset: assets[2], problem: 'Overflow risk detected', priority: 'HIGH' }] }, { title: 'Assigned', count: assignedCount, color: 'amber', cards: [{ id: 'AQ-1029', asset: assets[1], problem: 'Unusual consumption', priority: 'MEDIUM' }] }, { title: 'In progress', count: progressCount, color: 'aqua', cards: [{ id: 'AQ-1027', asset: assets[0], problem: 'Continuous abnormal flow', priority: 'HIGH' }] }, { title: 'Awaiting verification', count: verificationCount, color: 'purple', cards: [{ id: 'AQ-1021', asset: assets[3], problem: 'High water usage', priority: 'MEDIUM' }] }, { title: 'Resolved', count: resolvedCount, color: 'green', cards: [] }]; return <><PageHeader kicker="MAINTENANCE CENTER" title="Move work forward with context." copy="Every ticket connects an alert to a team, an intervention and a measurable outcome." action={<button className="button dark-button" onClick={onWorkOrder}><Wrench size={16} /> Create work order</button>} /><div className="kanban">{columns.map((column) => <div className="kanban-column" key={column.title}><div className="kanban-header"><span className={`kanban-dot ${column.color}`} /><strong>{column.title}</strong><b>{column.count}</b><MoreHorizontal size={16} /></div>{column.cards.map((card) => <button className="ticket-card" key={card.id} onClick={() => onAsset(card.asset)}><div className="ticket-top"><span>{card.id}</span><span className={`priority-tag ${card.priority.toLowerCase()}`}>{card.priority}</span></div><h3>{card.asset.id}</h3><p>{card.problem}</p><div className="ticket-impact"><span>Estimated impact</span><strong>{card.asset.loss}</strong></div><div className="ticket-footer"><span className="avatar tiny">{card.id === 'AQ-1027' ? 'MB' : 'AA'}</span><span>{card.id === 'AQ-1027' ? 'Maintenance Team B' : 'Unassigned'}</span><ArrowRight size={14} /></div></button>)}{column.title === 'New' && <button className="add-ticket" onClick={onWorkOrder}>+ Add work order</button>}</div>)}</div><div className="team-strip"><Users size={18} /><span><strong>Working with your existing maintenance teams.</strong> Route context-rich jobs to the people already keeping facilities running.</span><button className="text-link">View team performance <ArrowRight size={15} /></button></div></> }

function Insights({ onInvestigate, onAsset }: { onInvestigate: () => void; onAsset: (asset: Asset) => void }) { const featuredRisk = useLiveNumber(87, 3, 2400); const riskShift = useLiveNumber(0, 2, 2800); return <><PageHeader kicker="AI INSIGHTS" title="Intelligence behind every intervention." copy="The system identifies deviations from historical operating patterns — so teams can decide what to do next." action={<button className="button dark-button" onClick={onInvestigate}><Sparkles size={16} /> Investigate anomaly</button>} /><div className="insight-feature"><div className="insight-feature-copy"><span className="insight-badge"><Sparkles size={14} /> RECOMMENDED ACTION</span><h2>TAP-127 should be inspected within 48 hours.</h2><p>Continuous flow has deviated from this asset's historical idle pattern for 2h 17m. The system estimates {Math.max(420, featuredRisk * 5 + 30)} L of avoidable loss if the behavior continues.</p><div className="insight-actions"><button className="button button-primary" onClick={() => onAsset(assets[0])}>Review asset <ArrowRight size={15} /></button><button className="button button-ghost" onClick={onInvestigate}>See reasoning</button></div></div><div className="risk-ring"><div><strong>{featuredRisk}%</strong><span>failure risk</span></div></div></div><div className="insight-grid">{assets.slice(0, 4).map((asset) => <button className="insight-card" key={asset.id} onClick={() => onAsset(asset)}><div className="insight-card-top"><span className={`priority-status ${asset.status.toLowerCase()}`} /><span>{asset.id}</span><ArrowRight size={14} /></div><strong>{Math.max(1, Math.min(99, asset.risk + riskShift))}%</strong><h3>{asset.id === 'TAP-127' ? 'Failure risk' : asset.id === 'TANK-04' ? 'Overflow risk' : asset.id === 'PIPE-12' ? 'Pressure anomaly' : 'Valve failure'}</h3><p>The pattern has shifted from historical behavior.</p></button>)}</div></> }

function Efficiency() { const liveScore = useLiveNumber(82, 3, 2600); const scoreShift = useLiveNumber(0, 2, 3000); const facilities = [['Kolkata Central', '126 assets', 82], ['Station East', '98 assets', 78], ['Municipal Facility', '212 assets', 74], ['Government Hospital', '184 assets', 69], ['School Cluster', '76 assets', 63]]; return <><PageHeader kicker="WATER EFFICIENCY" title="Make water performance measurable." copy="A shared index helps authorities see where attention will create the most impact." action={<button className="button dark-button"><BarChart3 size={16} /> Export report</button>} /><div className="efficiency-overview"><div className="efficiency-score"><div className="score-ring"><strong>{liveScore}</strong><span>/100</span></div><div><span className="panel-kicker">KOLKATA CENTRAL</span><h2>Good network health</h2><p>Up {Math.max(1, liveScore - 76)} points since last month</p></div></div><div className="score-breakdown">{[['Leakage control', 95], ['Consumption efficiency', 72], ['Maintenance health', 88], ['Water availability', 91], ['Reuse & sustainability', 70]].map(([label, score]) => <div className="score-line" key={label}><span>{label}</span><b>{Math.max(1, Math.min(99, Number(score) + scoreShift))}</b><i><em style={{ width: `${Math.max(1, Math.min(99, Number(score) + scoreShift))}%` }} /></i></div>)}</div></div><section className="panel facility-ranking"><div className="panel-header"><div><span className="panel-kicker">FACILITY RANKINGS</span><h2>Where performance stands today</h2></div><button className="filter-button">All facilities <ChevronDown size={14} /></button></div>{facilities.map(([name, assetsLabel, score], index) => { const currentScore = Math.max(1, Math.min(99, Number(score) + scoreShift + (index === 0 ? liveScore - 82 : 0))); return ( <button className="facility-row" key={name}><span className="rank">0{index + 1}</span><span className="facility-name"><strong>{name}</strong><small>{assetsLabel}</small></span><span className="facility-bar"><i><em style={{ width: `${currentScore}%` }} /></i></span><strong className="facility-score">{currentScore}<small>/100</small></strong><ArrowRight size={15} /></button>); })}</section></> }

function ModalLayer({ modal, asset, step, onClose, onWorkOrder, onAsset }: { modal: Modal; asset: Asset; step: number; onClose: () => void; onWorkOrder: () => void; onAsset: (asset: Asset) => void }) { const stages = ['Abnormal flow detected','Historical behavior analyzed','Risk score generated','Water impact estimated','Priority assigned','Work order created','Maintenance team assigned','Repair recorded','Sensor behavior verified','Issue resolved']; if (modal === 'asset') return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal asset-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={18} /></button><div className="modal-kicker"><span className={`priority-status ${asset.status.toLowerCase()}`} /> ASSET OPERATIONAL PROFILE</div><h2>{asset.id}</h2><p className="modal-subtitle">{asset.name} · {asset.location}</p><div className="asset-status-row"><span className={`priority-tag ${asset.status.toLowerCase()}`}>{asset.status}</span><span><Radio size={14} /> Live sensor data</span></div><div className="asset-kpis"><div><span>Current flow</span><strong>{asset.flow}</strong></div><div><span>Pressure</span><strong>1.8 bar</strong></div><div><span>Continuous flow</span><strong>2h 17m</strong></div><div><span>Estimated loss</span><strong>{asset.loss}</strong></div></div><div className="asset-risk"><div><span>AI failure risk</span><strong>{asset.risk}%</strong></div><i><em style={{ width: `${asset.risk}%` }} /></i><p>The system identified a deviation from this asset's historical operating pattern.</p></div><div className="modal-actions"><button className="button button-primary" onClick={onWorkOrder}><Wrench size={15} /> Create work order</button><button className="button button-ghost" onClick={() => { onClose(); onAsset(asset); }}>View history <BarChart3 size={15} /></button></div></div></div>;
  if (modal === 'investigate') return <div className="modal-backdrop"><div className="modal investigate-modal"><button className="modal-close" onClick={onClose}><X size={18} /></button><div className="investigate-heading"><div className="pulse-orb"><Sparkles size={22} /></div><div><span className="modal-kicker">INVESTIGATE ANOMALY</span><h2>From signal to resolution.</h2><p>AQUASHIELD is following the intervention loop.</p></div></div><div className="investigation-list">{stages.map((stage, index) => <div className={`investigation-stage ${index < step ? 'done' : ''} ${index === step ? 'current' : ''}`} key={stage}><span>{index < step ? <Check size={14} /> : index + 1}</span><strong>{stage}</strong>{index === step && <i>Processing</i>}</div>)}</div>{step >= 9 && <div className="resolution-card"><div className="resolution-icon"><Check size={20} /></div><div><span>ISSUE RESOLVED</span><h3>Repair successfully verified</h3><p>Sensor behavior has returned to normal operation.</p></div><div className="resolution-metrics"><strong>468 L</strong><span>water loss prevented</span><strong>11 min</strong><span>response time</span></div></div>}<button className="button button-primary modal-full-button" onClick={onClose}>{step >= 9 ? 'Return to command center' : 'Continue in background'} <ArrowRight size={16} /></button></div></div>;
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal work-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={18} /></button><div className="modal-kicker">NEW MAINTENANCE ACTION</div><h2>Create work order</h2><p className="modal-subtitle">Turn an operational signal into a trackable field action.</p><label>Asset<input value={asset.id} readOnly /></label><label>Issue<input value="Continuous abnormal flow" readOnly /></label><label>Assign to<select defaultValue="team-b"><option value="team-b">Maintenance Team B</option><option value="team-a">Maintenance Team A</option><option value="supervisor">Central Facility Supervisor</option></select></label><div className="modal-actions"><button className="button button-primary" onClick={onClose}><Check size={15} /> Create and assign</button><button className="button button-ghost" onClick={onClose}>Cancel</button></div></div></div> }

export default App;
