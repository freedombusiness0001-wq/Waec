import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const nav = ['Home','About','Services','Programs','Projects','Blog','Events','Gallery','Team','Testimonials','Contact','FAQs','Careers','Donate']
const cards = ['Startup Incubation','AI & Robotics Lab','Digital Skills','SME Acceleration']
const fade = { initial:{opacity:0,y:24}, whileInView:{opacity:1,y:0}, viewport:{once:true,amount:.2}, transition:{duration:.6} }

export function App(){
  const [open,setOpen]=useState(false)
  const [dark,setDark]=useState(true)
  const [active,setActive]=useState('Home')
  const [projectFilter,setProjectFilter]=useState('All')
  const [faq,setFaq]=useState(null)
  const stats = useMemo(()=>[{k:'Startups Supported',v:240},{k:'Programs Run',v:87},{k:'Community Members',v:12000},{k:'Funding Facilitated($M)',v:9}],[])
  const projects = [{t:'AgriTech',c:'AI'},{t:'FinPulse',c:'Fintech'},{t:'HealthMesh',c:'Health'},{t:'EduSpark',c:'AI'}]

  return <div className={`${dark?'bg-[#070b1a] text-white':'bg-white text-slate-900'} min-h-screen`}>
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-violet-600/40 blur-[90px]"/>
      <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-indigo-600/30 blur-[100px]"/>
    </div>
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b1a]/65 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a className="text-xl font-extrabold">Tolbert<span className="text-violet-400"> Hub</span></a>
        <button className="md:hidden" onClick={()=>setOpen(!open)}>☰</button>
        <ul className={`${open?'flex':'hidden'} absolute left-4 right-4 top-16 flex-col gap-3 rounded-xl border border-white/15 bg-[#0d1230]/95 p-4 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}>
          {nav.map(n=><li key={n}><a href={`#${n.toLowerCase()}`} onClick={()=>setActive(n)} className={`text-sm ${active===n?'text-white':'text-slate-300 hover:text-white'}`}>{n}</a></li>)}
          <li><button onClick={()=>setDark(!dark)} className="rounded-lg border border-white/20 px-3 py-1 text-xs">{dark?'Light':'Dark'}</button></li>
        </ul>
      </nav>
    </header>

    <section id="home" className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2">
      <motion.div {...fade}>
        <p className="mb-4 inline-block rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1 text-xs">Innovation for Africa</p>
        <h1 className="text-5xl font-black leading-tight md:text-7xl">Build. Launch. Scale.<br/><span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">Future-Ready Ventures</span></h1>
        <p className="mt-6 max-w-xl text-slate-300">A premium innovation ecosystem for founders, creators, developers, and community changemakers.</p>
        <div className="mt-8 flex flex-wrap gap-3"><button className="btn">Join Program</button><button className="btn2">Explore Projects</button></div>
      </motion.div>
      <motion.div {...fade} className="glass p-6">
        <h3 className="text-lg font-bold">Innovation Dashboard</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{stats.map(s=><CounterCard key={s.k} {...s}/>)}</div>
      </motion.div>
    </section>

    <Section id="about" title="About" text="We accelerate ideas into high-impact ventures via mentorship, R&D, and ecosystem partnerships."/>
    <section id="services" className="sec"><Wrap><H2>Services</H2><Grid cols={4}>{cards.map(c=><Card key={c} title={c}/>)}</Grid></Wrap></section>
    <section id="programs" className="sec"><Wrap><H2>Programs</H2><Grid cols={3}><Card title="Founder Fellowship"/><Card title="Youth Tech Bootcamp"/><Card title="Women in AI"/></Grid></Wrap></section>
    <section id="projects" className="sec"><Wrap><H2>Projects</H2><div className="mb-5 flex gap-2">{['All','AI','Fintech','Health'].map(f=><button key={f} onClick={()=>setProjectFilter(f)} className="chip">{f}</button>)}</div><Grid cols={2}>{projects.filter(p=>projectFilter==='All'||p.c===projectFilter).map(p=><Card key={p.t} title={p.t} text={p.c}/>)}</Grid></Wrap></section>
    <Section id="blog" title="Blog" text="Latest innovation stories, startup insights, and ecosystem updates."/>
    <Section id="events" title="Events" text="Register for hackathons, demo days, and learning sessions with form-enabled workflows."/>
    <Section id="gallery" title="Gallery" text="Showcasing community moments, labs, products, and showcases."/>
    <Section id="team" title="Team" text="Cross-functional experts in venture building, design, and deep tech."/>
    <Section id="testimonials" title="Testimonials" text="Founders and partners trust our ecosystem to drive real outcomes."/>
    <section id="contact" className="sec"><Wrap><H2>Contact</H2><form className="glass grid gap-3 p-6 md:grid-cols-2"><input className="input" placeholder="Name" required/><input className="input" placeholder="Email" type="email" required/><textarea className="input md:col-span-2" placeholder="Message" required/><button className="btn w-fit">Send Message</button></form></Wrap></section>
    <section id="faqs" className="sec"><Wrap><H2>FAQs</H2>{['How to join programs?','Is there an admin portal?','Do you provide mentorship?'].map((q,i)=><div key={q} className="glass mb-3 overflow-hidden"><button className="w-full px-5 py-4 text-left font-semibold" onClick={()=>setFaq(faq===i?null:i)}>{q}</button><div className={`px-5 text-slate-300 transition-all ${faq===i?'max-h-24 pb-4':'max-h-0'}`}>Yes, through onboarding and verified profile workflow.</div></div>)}</Wrap></section>
    <Section id="careers" title="Careers" text="Join our mission-driven team and shape Africa’s innovation future."/>
    <Section id="donate" title="Donate / Support" text="Support programs, sponsor events, and empower the next generation of builders."/>

    <section className="sec"><Wrap><H2>Advanced Platform Modules</H2><Grid cols={3}><Card title="Admin Dashboard" text="KPI panels, role access, content approvals"/><Card title="Authentication" text="Sign up, login, protected routes"/><Card title="CMS" text="Manage pages, projects, events, blog"/><Card title="Newsletter" text="Subscription flows and campaign hooks"/><Card title="WhatsApp Chat" text="Sticky support action button"/><Card title="SEO Ready" text="Meta tags, semantic structure, fast load"/></Grid></Wrap></section>

    <a href="https://wa.me/0000000000" className="fixed bottom-5 right-5 rounded-full bg-green-500 px-4 py-3 font-bold text-white shadow-lg">WhatsApp</a>
    <footer className="border-t border-white/10 bg-black/20"><div className="mx-auto grid max-w-7xl gap-3 px-5 py-8 md:grid-cols-3"><p className="font-bold">Tolbert Hub</p><p className="text-slate-300">Premium innovation platform experience.</p><p className="text-slate-400 md:text-right">© 2026</p></div></footer>
  </div>
}

function Section({id,title,text}){return <section id={id} className="sec"><Wrap><H2>{title}</H2><motion.p {...fade} className="mx-auto max-w-3xl text-center text-slate-300">{text}</motion.p></Wrap></section>}
function Wrap({children}){return <div className="mx-auto max-w-7xl px-5">{children}</div>}
function H2({children}){return <motion.h2 {...fade} className="mb-6 text-center text-3xl font-extrabold md:text-5xl">{children}</motion.h2>}
function Grid({children,cols=3}){return <div className={`grid gap-4 ${cols===4?'lg:grid-cols-4':cols===3?'md:grid-cols-2 lg:grid-cols-3':'md:grid-cols-2'}`}>{children}</div>}
function Card({title,text='Premium innovation experience for startups, teams, and communities.'}){return <motion.article {...fade} className="glass p-5"><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 text-slate-300">{text}</p></motion.article>}
function CounterCard({k,v}){return <div className="rounded-xl border border-white/15 bg-white/5 p-4"><p className="text-3xl font-black text-violet-300">{v.toLocaleString()}+</p><p className="mt-1 text-xs text-slate-300">{k}</p></div>}
