import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Bell, CalendarDays, Check, CheckCircle2, ChevronRight,
  Clock3, Compass, Heart, Home, MapPin, Menu, Search, Share2, SlidersHorizontal,
  Sparkles, Star, UserRound, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { categories, createArtists, createServices, dates, slots, type Artist, type Service } from "@/lib/saj-data";
import rheaImage from "@/assets/bridal-rhea.jpg";
import ananyaImage from "@/assets/bridal-ananya.jpg";
import meherImage from "@/assets/bridal-meher.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAJ — Your Bridal Look Starts Here" },
      { name: "description", content: "Discover India's sought-after bridal artists, explore their work, and book your moment." },
      { property: "og:title", content: "SAJ — Your Bridal Look Starts Here" },
      { property: "og:description", content: "Everything she needs for her big day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SajApp,
});

const artists = createArtists([rheaImage, ananyaImage, meherImage]);
const services = createServices([rheaImage, ananyaImage, meherImage]);
type View = "home" | "explore" | "portfolio" | "service" | "booking" | "confirmation" | "bookings" | "tracking" | "saved" | "profile";
type Intro = "splash" | "onboarding" | "login" | "app";

function Logo({ light = false }: { light?: boolean }) {
  return <div className={cn("font-display text-3xl leading-none", light ? "text-primary-foreground" : "text-primary")}>SAJ<span className="ml-1 align-top font-sans text-[8px] tracking-[.24em]">BRIDAL</span></div>;
}

function IconButton({ label, children, onClick, active = false }: { label: string; children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return <Button type="button" variant="glass" size="icon" aria-label={label} title={label} onClick={onClick} className={cn("h-11 w-11 shrink-0", active && "bg-primary text-primary-foreground")}>{children}</Button>;
}

function Header({ title, onBack, action }: { title?: string; onBack?: () => void; action?: React.ReactNode }) {
  return <header className="sticky top-0 z-40 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-2 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-xl">
    {onBack ? <IconButton label="Go back" onClick={onBack}><ArrowLeft /></IconButton> : <Logo />}
    {title ? <h1 className="truncate text-center font-display text-xl">{title}</h1> : <span />}
    <div className="flex justify-end">{action ?? <IconButton label="Notifications"><Bell /></IconButton>}</div>
  </header>;
}

function IntroFlow({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<Intro>("splash");
  const [slide, setSlide] = useState(0);
  const onboarding = [
    { eyebrow: "DISCOVER YOUR LOOK", copy: "From bridal makeup to the finishing touches.", image: rheaImage },
    { eyebrow: "FIND YOUR ARTIST", copy: "See the work before you book the artist.", image: ananyaImage },
    { eyebrow: "BOOK YOUR MOMENT", copy: "Choose your date. Pick your time. You’re booked.", image: meherImage },
  ];
  if (stage === "splash") return <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-primary px-8 text-center text-primary-foreground">
    <div aria-hidden className="absolute inset-6 rounded-[40%] border border-primary-foreground/10" />
    <div aria-hidden className="absolute left-[-60px] top-24 h-56 w-56 rounded-full border border-primary-foreground/10" />
    <div className="animate-gentle-in relative">
      <div className="font-display text-8xl leading-none">SAJ</div>
      <div className="mt-5 text-xs tracking-[.28em] text-primary-foreground/70">BRIDAL BEAUTY</div>
      <p className="mt-14 font-display text-2xl leading-snug">Everything she needs<br />for her big day.</p>
      <Button variant="glass" size="lg" className="mt-12 min-w-44" onClick={() => setStage("onboarding")}>Begin <ArrowRight /></Button>
    </div>
  </main>;
  if (stage === "onboarding") {
    const item = onboarding[slide];
    return <main className="relative min-h-dvh overflow-hidden bg-berry-deep text-primary-foreground">
      <img src={item.image} alt="Indian bridal beauty" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-berry-deep via-berry-deep/20 to-transparent" />
      <Button variant="ghost" className="absolute right-4 top-5 z-10 text-primary-foreground" onClick={() => setStage("login")}>Skip</Button>
      <div className="absolute inset-x-0 bottom-0 p-7 pb-10">
        <div className="mb-5 flex gap-2">{onboarding.map((_, i) => <span key={i} className={cn("h-1 rounded-full transition-all", i === slide ? "w-9 bg-primary-foreground" : "w-4 bg-primary-foreground/40")} />)}</div>
        <p className="text-xs font-semibold tracking-[.18em]">{item.eyebrow}</p>
        <h1 className="mt-3 max-w-sm font-display text-4xl leading-tight">{item.copy}</h1>
        <Button variant="glass" size="lg" className="mt-8 w-full" onClick={() => slide < 2 ? setSlide(slide + 1) : setStage("login")}>{slide < 2 ? "Continue" : "Find my artist"}<ArrowRight /></Button>
      </div>
    </main>;
  }
  return <main className="flex min-h-dvh flex-col justify-between bg-background px-6 py-8">
    <div className="flex justify-between"><Logo /><span className="text-xs text-muted-foreground">WELCOME</span></div>
    <div className="animate-gentle-in">
      <p className="text-xs font-semibold tracking-[.18em] text-primary">YOUR BRIDAL EDIT</p>
      <h1 className="mt-3 font-display text-5xl leading-[1.05]">Let’s begin<br />beautifully.</h1>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">Save artists, plan your services and keep every booking in one calm place.</p>
      <div className="mt-9 space-y-3"><Input aria-label="Phone number" placeholder="Phone number" className="h-14 rounded-2xl bg-card px-4" /><Button size="lg" className="w-full" onClick={onFinish}>Continue with phone <ArrowRight /></Button></div>
    </div>
    <Button variant="ghost" onClick={onFinish}>Explore as guest</Button>
  </main>;
}

function PortfolioCard({ artist, onOpen, saved, onSave }: { artist: Artist; onOpen: () => void; saved: boolean; onSave: () => void }) {
  return <article onClick={onOpen} className="group relative aspect-[4/5] w-[82vw] max-w-[340px] shrink-0 snap-center cursor-pointer overflow-hidden rounded-[24px] bg-card shadow-luxury transition-transform active:scale-[.985]">
    <img src={artist.image} alt={`${artist.studio} bridal portfolio`} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
    <div className="absolute inset-0 bg-gradient-to-t from-berry-deep/95 via-transparent to-berry-deep/10" />
    <div className="absolute right-4 top-4" onClick={(e) => e.stopPropagation()}><IconButton label={saved ? "Unsave artist" : "Save artist"} active={saved} onClick={onSave}><Heart className={cn(saved && "fill-current")} /></IconButton></div>
    <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
      <div className="mb-2 flex items-center gap-1 text-xs"><Star className="size-3 fill-current" /> {artist.rating} · {artist.reviews} brides</div>
      <h3 className="font-display text-3xl leading-tight">{artist.studio}</h3>
      <p className="mt-1 text-xs text-primary-foreground/75">{artist.category} · {artist.location}</p>
      <div className="mt-4 flex items-center gap-2 text-xs font-bold tracking-[.13em]">VIEW PORTFOLIO <ArrowRight className="size-3" /></div>
    </div>
  </article>;
}

function BottomNav({ view, go }: { view: View; go: (view: View) => void }) {
  const items: { label: string; view: View; icon: typeof Home }[] = [
    { label: "Home", view: "home", icon: Home }, { label: "Explore", view: "explore", icon: Compass },
    { label: "Bookings", view: "bookings", icon: CalendarDays }, { label: "Saved", view: "saved", icon: Heart }, { label: "Profile", view: "profile", icon: UserRound },
  ];
  return <nav className="safe-bottom fixed inset-x-3 bottom-2 z-50 mx-auto flex max-w-[440px] items-center justify-around rounded-[22px] border border-glass-border bg-glass px-1 pt-2 shadow-glass backdrop-blur-2xl">
    {items.map(({ label, view: target, icon: Icon }) => <Button key={label} variant="ghost" onClick={() => go(target)} className={cn("h-12 min-w-14 flex-col gap-0.5 rounded-xl px-2 text-[9px]", view === target ? "text-primary" : "text-muted-foreground")}><Icon className={cn("size-5", view === target && label === "Saved" && "fill-current")} /><span>{label}</span></Button>)}
  </nav>;
}

function HomeView({ openArtist, openService, saved, toggleSave, go }: { openArtist: (a: Artist) => void; openService: (s: Service) => void; saved: number[]; toggleSave: (id: number) => void; go: (v: View) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  return <div className="pb-28 animate-gentle-in">
    <Header />
    <section className="px-5 pb-7 pt-8">
      <p className="text-[11px] font-bold tracking-[.2em] text-primary">YOUR BRIDAL LOOK STARTS HERE</p>
      <h1 className="mt-3 max-w-sm font-display text-[42px] leading-[1.04]">Everything she needs<br />for her big day.</h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">Discover artists, explore their work, and book your bridal services.</p>
      <div className="mt-6 flex gap-3"><Button size="lg" onClick={() => scroller.current?.scrollIntoView({ behavior: "smooth" })}>Explore looks</Button><Button variant="outline" size="lg" onClick={() => go("explore")}>Find a service</Button></div>
    </section>
    <section ref={scroller} className="pt-4">
      <div className="mb-4 flex items-end justify-between px-5"><div><p className="text-[10px] font-bold tracking-[.2em] text-primary">CURATED FOR YOU</p><h2 className="mt-1 font-display text-2xl">Trending bridal looks</h2></div><span className="text-xs text-muted-foreground">{current} / 8</span></div>
      <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-7" onScroll={(e) => setCurrent(Math.min(8, Math.max(1, Math.round(e.currentTarget.scrollLeft / (e.currentTarget.clientWidth * .82)) + 1)))}>{artists.map((artist) => <PortfolioCard key={artist.id} artist={artist} onOpen={() => openArtist(artist)} saved={saved.includes(artist.id)} onSave={() => toggleSave(artist.id)} />)}</div>
    </section>
    <section className="px-5 py-6"><div className="mb-4 flex items-center justify-between"><h2 className="font-display text-2xl">Finish the look</h2><Button variant="link" onClick={() => go("explore")}>See all</Button></div><div className="grid grid-cols-2 gap-3">{services.slice(3, 7).map((s) => <button key={s.id} onClick={() => openService(s)} className="overflow-hidden rounded-2xl bg-card text-left shadow-sm transition-transform active:scale-[.98]"><img src={s.image} alt="" loading="lazy" width={1024} height={1280} className="aspect-[4/3] w-full object-cover" /><div className="p-3"><h3 className="text-sm font-semibold">{s.name}</h3><p className="mt-1 text-xs text-muted-foreground">From ₹{s.price.toLocaleString("en-IN")}</p></div></button>)}</div></section>
  </div>;
}

function ExploreView({ openArtist, openService, saved, toggleSave }: { openArtist: (a: Artist) => void; openService: (s: Service) => void; saved: number[]; toggleSave: (id: number) => void }) {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("All"); const [filters, setFilters] = useState(false);
  const results = artists.filter((a) => `${a.studio} ${a.category} ${a.location}`.toLowerCase().includes(query.toLowerCase()) && (category === "All" || a.category.includes(category.split(" ")[0])));
  return <div className="pb-28 animate-gentle-in"><Header title="Explore" action={<IconButton label="Filters" onClick={() => setFilters(true)}><SlidersHorizontal /></IconButton>} />
    <section className="px-5 pt-6"><h1 className="font-display text-4xl">Find your artist.</h1><div className="relative mt-5"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" className="h-14 rounded-full bg-card pl-11" /></div></section>
    <div className="hide-scrollbar flex gap-2 overflow-auto px-5 py-5">{categories.map((c) => <Button key={c} variant={category === c ? "default" : "glass"} className="shrink-0 rounded-full" onClick={() => setCategory(c)}>{c}</Button>)}</div>
    <section className="px-5"><h2 className="mb-4 font-display text-2xl">Popular near you</h2><div className="space-y-3">{results.map((a) => <article key={a.id} className="grid grid-cols-[100px_minmax(0,1fr)_44px] gap-3 rounded-2xl bg-card p-2 shadow-sm"><button onClick={() => openArtist(a)}><img src={a.image} alt={a.studio} loading="lazy" width={1024} height={1280} className="h-28 w-full rounded-xl object-cover" /></button><button onClick={() => openArtist(a)} className="min-w-0 py-2 text-left"><h3 className="truncate font-display text-lg">{a.studio}</h3><p className="mt-1 text-xs text-muted-foreground">{a.category}</p><p className="mt-3 flex items-center gap-1 text-xs"><Star className="size-3 fill-primary text-primary" /> {a.rating} · {a.location}</p></button><IconButton label="Save artist" active={saved.includes(a.id)} onClick={() => toggleSave(a.id)}><Heart className={cn(saved.includes(a.id) && "fill-current")} /></IconButton></article>)}</div></section>
    <section className="mt-8 px-5"><h2 className="mb-4 font-display text-2xl">Services</h2><div className="space-y-2">{services.slice(0, 6).map((s) => <button key={s.id} onClick={() => openService(s)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center rounded-2xl border border-border bg-card p-4 text-left"><span><b className="block text-sm">{s.name}</b><small className="text-muted-foreground">{s.duration} · from ₹{s.price.toLocaleString("en-IN")}</small></span><ChevronRight className="size-4" /></button>)}</div></section>
    {filters && <div className="fixed inset-0 z-[70] flex items-end bg-berry-deep/45" onClick={() => setFilters(false)}><div className="w-full animate-gentle-in rounded-t-[28px] bg-background p-6" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between"><h2 className="font-display text-3xl">Refine your edit</h2><IconButton label="Close filters" onClick={() => setFilters(false)}><X /></IconButton></div><div className="mt-6 grid grid-cols-2 gap-3">{["Date", "Location", "Price", "Rating", "Service", "Style"].map((x) => <Button variant="outline" className="h-12 rounded-2xl" key={x}>{x}</Button>)}</div><Button size="lg" className="mt-6 w-full" onClick={() => setFilters(false)}>Show {results.length} artists</Button></div></div>}
  </div>;
}

function PortfolioView({ artist, back, openService, saved, toggleSave }: { artist: Artist; back: () => void; openService: (s: Service) => void; saved: boolean; toggleSave: () => void }) {
  const gallery = [artist.image, ananyaImage, meherImage, rheaImage, artist.image, meherImage]; const [category, setCategory] = useState("All"); const [lightbox, setLightbox] = useState<number | null>(null);
  return <div className="animate-gentle-in pb-28"><section className="relative h-[67vh] min-h-[520px]"><img src={artist.image} alt={`${artist.studio} bridal work`} width={1024} height={1280} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-berry-deep via-transparent to-berry-deep/20" /><div className="absolute inset-x-0 top-0 flex justify-between p-4"><IconButton label="Go back" onClick={back}><ArrowLeft /></IconButton><div className="flex gap-2"><IconButton label="Share"><Share2 /></IconButton><IconButton label="Save artist" active={saved} onClick={toggleSave}><Heart className={cn(saved && "fill-current")} /></IconButton></div></div><div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground"><span className="rounded-full bg-glass/20 px-3 py-1 text-[10px] tracking-[.15em] backdrop-blur">VERIFIED ARTIST</span><h1 className="mt-3 font-display text-4xl">{artist.studio}</h1><p className="mt-2 font-display text-xl italic text-primary-foreground/85">“{artist.tagline}”</p><div className="mt-4 flex flex-wrap gap-4 text-xs"><span>★ {artist.rating} · {artist.reviews} reviews</span><span>{artist.experience}</span><span>{artist.location}</span></div></div></section>
    <section className="py-7"><div className="px-5"><p className="text-[10px] font-bold tracking-[.2em] text-primary">SELECTED WORK</p><h2 className="mt-1 font-display text-3xl">Portfolio</h2></div><div className="hide-scrollbar flex gap-2 overflow-auto px-5 py-4">{["All", "Bridal", "Engagement", "Reception", "Haldi", "Sangeet"].map((c) => <Button key={c} variant={category === c ? "default" : "glass"} className="shrink-0" onClick={() => setCategory(c)}>{c}</Button>)}</div><div className="grid grid-cols-2 gap-2 px-3">{gallery.map((img, i) => <button key={i} onClick={() => setLightbox(i)} className={cn("overflow-hidden rounded-xl", i % 3 === 0 ? "row-span-2" : "")}><img src={img} alt={`${category} look ${i + 1}`} loading="lazy" width={1024} height={1280} className={cn("w-full object-cover", i % 3 === 0 ? "h-full min-h-80" : "aspect-square")} /></button>)}</div></section>
    <section className="border-y border-border px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">ABOUT THE ARTIST</p><p className="mt-3 font-display text-2xl leading-relaxed">{artist.bio}</p></section>
    <section className="px-5 py-8"><h2 className="font-display text-3xl">Services</h2><div className="mt-4 divide-y divide-border">{services.slice(0, 4).map((s) => <button key={s.id} onClick={() => openService(s)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center py-4 text-left"><span><b>{s.name}</b><small className="mt-1 block text-muted-foreground">{s.duration}</small></span><span className="font-semibold">₹{s.price.toLocaleString("en-IN")} <ChevronRight className="inline size-4" /></span></button>)}</div></section>
    <section className="mx-5 rounded-2xl bg-nude p-5"><div className="flex gap-1 text-primary">★★★★★</div><blockquote className="mt-3 font-display text-xl">“From the trial to the final touch, I felt completely understood.”</blockquote><p className="mt-3 text-xs text-muted-foreground">Mira S. · December bride</p></section>
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-border bg-glass p-3 backdrop-blur-xl"><div className="mx-auto grid max-w-[430px] grid-cols-[1fr_auto] items-center gap-3"><div><small className="text-muted-foreground">Bridal Makeup</small><b className="block">₹25,000</b></div><Button size="lg" onClick={() => openService(services[0])}>Book now <ArrowRight /></Button></div></div>
    {lightbox !== null && <div className="fixed inset-0 z-[80] flex items-center bg-berry-deep" onClick={() => setLightbox(null)}><img src={gallery[lightbox]} alt="Portfolio detail" className="max-h-dvh w-full object-contain" /><div className="absolute right-4 top-4"><IconButton label="Close gallery" onClick={() => setLightbox(null)}><X /></IconButton></div><span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-primary-foreground">{lightbox + 1} / {gallery.length}</span></div>}
  </div>;
}

function ServiceView({ service, back, book }: { service: Service; back: () => void; book: () => void }) {
  return <div className="animate-gentle-in pb-28"><section className="relative aspect-[4/4.5]"><img src={service.image} alt={service.name} width={1024} height={1280} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-berry-deep/80 via-transparent to-berry-deep/20" /><div className="absolute left-4 top-4"><IconButton label="Go back" onClick={back}><ArrowLeft /></IconButton></div><div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground"><p className="text-[10px] font-bold tracking-[.2em]">SAJ SIGNATURE SERVICE</p><h1 className="mt-2 font-display text-4xl">{service.name}</h1></div></section><section className="px-5 py-7"><div className="flex justify-between"><div><small className="text-muted-foreground">From</small><p className="font-display text-3xl">₹{service.price.toLocaleString("en-IN")}</p></div><div className="text-right"><small className="text-muted-foreground">Duration</small><p className="mt-1 flex items-center gap-1 font-semibold"><Clock3 className="size-4" /> {service.duration}</p></div></div><p className="mt-7 leading-relaxed text-muted-foreground">{service.description}</p><h2 className="mt-8 font-display text-2xl">What’s included</h2><ul className="mt-3 space-y-3">{service.inclusions.map((x) => <li key={x} className="flex items-center gap-3 border-b border-border pb-3 text-sm"><Check className="size-4 text-primary" />{x}</li>)}</ul><h2 className="mt-8 font-display text-2xl">Artists for this service</h2><div className="hide-scrollbar mt-4 flex gap-3 overflow-auto">{artists.slice(0, 3).map((a) => <div key={a.id} className="w-36 shrink-0"><img src={a.image} alt={a.name} loading="lazy" width={1024} height={1280} className="aspect-[4/5] rounded-xl object-cover" /><b className="mt-2 block truncate text-xs">{a.studio}</b><small className="text-muted-foreground">★ {a.rating}</small></div>)}</div></section><div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-border bg-glass p-3 backdrop-blur-xl"><Button size="lg" className="mx-auto flex w-full max-w-[400px]" onClick={book}>Book this service <ArrowRight /></Button></div></div>;
}

function BookingFlow({ service, artist, cancel, confirm }: { service: Service; artist: Artist; cancel: () => void; confirm: (date: string, time: string) => void }) {
  const [step, setStep] = useState(1); const [date, setDate] = useState(dates[0].full); const [time, setTime] = useState("");
  return <div className="min-h-dvh animate-gentle-in pb-28"><Header title="Book your moment" onBack={() => step > 1 ? setStep(step - 1) : cancel()} /><div className="px-5 pt-5"><div className="flex gap-2">{[1,2,3].map((n) => <span key={n} className={cn("h-1 flex-1 rounded-full", n <= step ? "bg-primary" : "bg-muted")} />)}</div><div className="mt-2 flex justify-between text-[9px] font-bold tracking-[.12em] text-muted-foreground"><span>SERVICE</span><span>DATE & TIME</span><span>DETAILS</span></div></div>
    {step === 1 && <section className="px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">STEP ONE</p><h1 className="mt-2 font-display text-4xl">Your selected service</h1><div className="mt-6 grid grid-cols-[90px_minmax(0,1fr)] gap-4 rounded-2xl bg-card p-3 shadow-sm"><img src={service.image} alt="" className="h-28 w-full rounded-xl object-cover" /><div className="py-2"><h2 className="font-display text-xl">{service.name}</h2><p className="mt-2 text-xs text-muted-foreground">with {artist.studio}</p><p className="mt-4 font-semibold">₹{service.price.toLocaleString("en-IN")}</p></div></div><div className="mt-8 rounded-2xl border border-border p-4"><p className="text-xs text-muted-foreground">At a glance</p><div className="mt-3 flex justify-between text-sm"><span>{service.duration}</span><span>{artist.location}</span><span>★ {artist.rating}</span></div></div></section>}
    {step === 2 && <section className="px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">OCTOBER 2026</p><h1 className="mt-2 font-display text-4xl">Choose a date.</h1><div className="hide-scrollbar mt-6 flex gap-2 overflow-auto">{dates.map((d) => <Button key={d.day} variant={date === d.full ? "default" : "outline"} onClick={() => setDate(d.full)} className="h-20 w-16 shrink-0 flex-col rounded-2xl"><small>{d.dow}</small><b className="text-lg">{d.day}</b></Button>)}</div><h2 className="mt-9 font-display text-2xl">Available times</h2><p className="mt-1 text-xs text-muted-foreground">Availability checked moments ago</p><div className="mt-4 grid grid-cols-2 gap-3">{slots.map((slot) => <Button key={slot.time} variant={time === slot.time ? "default" : "outline"} disabled={!slot.available} onClick={() => setTime(slot.time)} className="h-14 flex-col rounded-2xl"><span>{slot.time}</span><small className="text-[9px]">{slot.available ? "AVAILABLE" : "BOOKED"}</small></Button>)}</div></section>}
    {step === 3 && <section className="px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">STEP THREE</p><h1 className="mt-2 font-display text-4xl">A few details.</h1><div className="mt-6 space-y-3"><Input aria-label="Name" defaultValue="Ayesha Khan" placeholder="Name" className="h-14 rounded-2xl bg-card px-4" /><Input aria-label="Phone" defaultValue="+91 98765 43210" placeholder="Phone" className="h-14 rounded-2xl bg-card px-4" /><Input aria-label="Event type" defaultValue="Wedding" placeholder="Event type" className="h-14 rounded-2xl bg-card px-4" /><Input aria-label="Venue" defaultValue="The Oberoi Grand, Kolkata" placeholder="Venue" className="h-14 rounded-2xl bg-card px-4" /><Textarea aria-label="Additional notes" placeholder="Additional notes (optional)" className="min-h-24 rounded-2xl bg-card p-4" /></div><div className="mt-6 rounded-2xl bg-nude p-4 text-sm"><b className="font-display text-lg">Your booking</b><p className="mt-2 text-muted-foreground">{service.name} · {date}<br />{time} · {artist.studio}</p></div></section>}
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-border bg-glass p-3 backdrop-blur-xl"><Button size="lg" disabled={step === 2 && !time} className="mx-auto flex w-full max-w-[400px]" onClick={() => step < 3 ? setStep(step + 1) : confirm(date, time)}>{step === 3 ? "Confirm booking" : "Continue"}<ArrowRight /></Button></div>
  </div>;
}

function Confirmation({ service, artist, date, time, go }: { service: Service; artist: Artist; date: string; time: string; go: (v: View) => void }) {
  return <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-primary px-6 text-center text-primary-foreground"><span className="animate-petal absolute left-[15%] top-0 text-2xl text-primary-foreground/30">✦</span><span className="animate-petal absolute left-[75%] top-[-20%] text-lg text-primary-foreground/20 [animation-delay:2s]">✦</span><div className="animate-gentle-in w-full max-w-sm"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10"><Check className="size-9" /></div><h1 className="mt-7 font-display text-4xl">Your moment is booked.</h1><p className="mt-3 text-xs tracking-[.16em] text-primary-foreground/70">BOOKING ID · SS-120426</p><div className="mt-8 rounded-3xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 text-left backdrop-blur-xl"><Detail label="Service" value={service.name} /><Detail label="Date & time" value={`${date} · ${time}`} /><Detail label="Status" value="CONFIRMED" /><Detail label="Artist" value={artist.studio} /><Detail label="Location" value={artist.location} /></div><Button variant="glass" size="lg" className="mt-6 w-full" onClick={() => go("tracking")}>View booking</Button><Button variant="ghost" className="mt-2 text-primary-foreground" onClick={() => go("home")}>Back to home</Button><p className="mt-10 font-display text-xl text-primary-foreground/80">Take a breath.<br />One more thing checked off.</p></div></main>;
}

function Detail({ label, value }: { label: string; value: string }) { return <div className="grid grid-cols-[95px_minmax(0,1fr)] border-b border-primary-foreground/10 py-3 last:border-0"><span className="text-xs text-primary-foreground/60">{label}</span><b className="text-right text-sm">{value}</b></div>; }

function BookingsView({ go }: { go: (v: View) => void }) {
  const [tab, setTab] = useState("UPCOMING"); return <div className="pb-28 animate-gentle-in"><Header title="My bookings" /><div className="mx-5 mt-6 grid grid-cols-3 rounded-full bg-muted p-1">{["UPCOMING", "COMPLETED", "CANCELLED"].map((x) => <Button key={x} variant={tab === x ? "default" : "ghost"} className="rounded-full text-[10px]" onClick={() => setTab(x)}>{x}</Button>)}</div><section className="px-5 py-7">{tab === "UPCOMING" ? <button onClick={() => go("tracking")} className="w-full overflow-hidden rounded-2xl bg-card text-left shadow-sm"><img src={rheaImage} alt="Rhea Kapoor Beauty" className="aspect-[16/8] w-full object-cover object-top" /><div className="p-5"><div className="flex justify-between"><span className="rounded-full bg-accent px-3 py-1 text-[9px] font-bold text-accent-foreground">CONFIRMED</span><ChevronRight /></div><h2 className="mt-4 font-display text-2xl">Bridal Makeup</h2><p className="mt-1 text-sm text-muted-foreground">Rhea Kapoor Beauty</p><div className="mt-4 flex gap-4 text-xs"><span>12 Oct · 10:00 AM</span><span>Kolkata</span></div></div></button> : <div className="py-24 text-center"><CalendarDays className="mx-auto size-8 text-muted-foreground" /><h2 className="mt-4 font-display text-2xl">Nothing here yet</h2><p className="mt-2 text-sm text-muted-foreground">Your {tab.toLowerCase()} bookings will appear here.</p></div>}</section></div>;
}

function TrackingView({ back }: { back: () => void }) {
  const steps = [{ n: "Booking confirmed", done: true }, { n: "Artist assigned", done: true }, { n: "Upcoming appointment", done: false }, { n: "Service in progress", done: false }, { n: "Completed", done: false }];
  return <div className="pb-10 animate-gentle-in"><Header title="Booking status" onBack={back} /><section className="px-5 py-7"><div className="rounded-2xl bg-card p-4 shadow-sm"><p className="text-[10px] font-bold tracking-[.18em] text-primary">12 OCTOBER · 10:00 AM</p><h1 className="mt-2 font-display text-3xl">Bridal Makeup</h1><p className="mt-1 text-sm text-muted-foreground">Rhea Kapoor Beauty · Kolkata</p></div><div className="mt-9">{steps.map((s, i) => <div key={s.n} className="grid grid-cols-[28px_minmax(0,1fr)] gap-4"><div className="flex flex-col items-center"><span className={cn("grid h-7 w-7 place-items-center rounded-full border", s.done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground")}>{s.done ? <Check className="size-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}</span>{i < steps.length - 1 && <span className={cn("h-16 w-px", s.done ? "bg-primary" : "bg-border")} />}</div><div className="pt-1"><b className="text-sm uppercase tracking-[.1em]">{s.n}</b>{i === 1 && <p className="mt-1 text-xs text-muted-foreground">Rhea Kapoor has been assigned</p>}</div></div>)}</div><div className="mt-7 rounded-2xl bg-nude p-5"><h2 className="font-display text-xl">Appointment details</h2><div className="mt-4 space-y-3 text-sm"><p><UserRound className="mr-2 inline size-4" /> Rhea Kapoor</p><p><CalendarDays className="mr-2 inline size-4" /> 12 October 2026</p><p><Clock3 className="mr-2 inline size-4" /> 10:00 AM</p><p><MapPin className="mr-2 inline size-4" /> The Oberoi Grand, Kolkata</p></div></div></section></div>;
}

function SavedView({ saved, openArtist, toggleSave }: { saved: number[]; openArtist: (a: Artist) => void; toggleSave: (id: number) => void }) {
  const list = artists.filter((a) => saved.includes(a.id)); return <div className="pb-28 animate-gentle-in"><Header title="Saved artists" /><section className="px-5 py-7"><h1 className="font-display text-4xl">Your shortlist.</h1><p className="mt-2 text-sm text-muted-foreground">The artists you’d love to come back to.</p>{list.length ? <div className="mt-6 grid grid-cols-2 gap-3">{list.map((a) => <article key={a.id} className="relative overflow-hidden rounded-2xl bg-card shadow-sm"><button onClick={() => openArtist(a)} className="w-full text-left"><img src={a.image} alt={a.studio} className="aspect-[4/5] w-full object-cover" /><div className="p-3"><h2 className="truncate font-display text-lg">{a.studio}</h2><p className="mt-1 text-[11px] text-muted-foreground">★ {a.rating} · {a.location}</p></div></button><div className="absolute right-2 top-2"><IconButton label="Remove saved artist" active onClick={() => toggleSave(a.id)}><Heart className="fill-current" /></IconButton></div></article>)}</div> : <div className="py-24 text-center"><Heart className="mx-auto size-9 text-muted-foreground" /><h2 className="mt-4 font-display text-2xl">Your edit awaits</h2><p className="mt-2 text-sm text-muted-foreground">Tap the heart on an artist you love.</p></div>}</section></div>;
}

function ProfileView({ go }: { go: (v: View) => void }) {
  const rows = ["My Details", "Bridal Preferences", "Event Details", "Saved Artists", "My Bookings", "Notifications", "Help & Support"];
  return <div className="pb-28 animate-gentle-in"><Header title="Profile" /><section className="px-5 py-7 text-center"><img src={ananyaImage} alt="Ayesha Khan" className="mx-auto h-24 w-24 rounded-full object-cover" /><h1 className="mt-4 font-display text-3xl">Ayesha Khan</h1><p className="text-xs tracking-[.13em] text-primary">BRIDE PROFILE</p><div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card text-left">{rows.map((x) => <button key={x} onClick={() => x === "Saved Artists" ? go("saved") : x === "My Bookings" ? go("bookings") : undefined} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border px-4 py-4 last:border-0"><span className="text-sm">{x}</span><ChevronRight className="size-4 text-muted-foreground" /></button>)}</div></section></div>;
}

function SajApp() {
  const [intro, setIntro] = useState<Intro>("splash"); const [view, setView] = useState<View>("home");
  const [artist, setArtist] = useState(artists[0]); const [service, setService] = useState(services[0]); const [saved, setSaved] = useState<number[]>([2]); const [booking, setBooking] = useState({ date: dates[0].full, time: "10:00 AM" });
  useEffect(() => { const seen = localStorage.getItem("saj-onboarded"); if (seen) setIntro("app"); const stored = localStorage.getItem("saj-saved"); if (stored) { try { setSaved(JSON.parse(stored)); } catch { /* use defaults */ } } }, []);
  const navigate = (next: View) => { setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggleSave = (id: number) => setSaved((old) => { const next = old.includes(id) ? old.filter((x) => x !== id) : [...old, id]; localStorage.setItem("saj-saved", JSON.stringify(next)); return next; });
  const openArtist = (a: Artist) => { setArtist(a); navigate("portfolio"); }; const openService = (s: Service) => { setService(s); navigate("service"); };
  const content = useMemo(() => {
    if (view === "home") return <HomeView openArtist={openArtist} openService={openService} saved={saved} toggleSave={toggleSave} go={navigate} />;
    if (view === "explore") return <ExploreView openArtist={openArtist} openService={openService} saved={saved} toggleSave={toggleSave} />;
    if (view === "portfolio") return <PortfolioView artist={artist} back={() => navigate("home")} openService={openService} saved={saved.includes(artist.id)} toggleSave={() => toggleSave(artist.id)} />;
    if (view === "service") return <ServiceView service={service} back={() => navigate("portfolio")} book={() => navigate("booking")} />;
    if (view === "booking") return <BookingFlow service={service} artist={artist} cancel={() => navigate("service")} confirm={(date, time) => { setBooking({ date, time }); localStorage.setItem("saj-booking", JSON.stringify({ date, time, service: service.name, artist: artist.studio })); navigate("confirmation"); }} />;
    if (view === "confirmation") return <Confirmation service={service} artist={artist} date={booking.date} time={booking.time} go={navigate} />;
    if (view === "bookings") return <BookingsView go={navigate} />;
    if (view === "tracking") return <TrackingView back={() => navigate("bookings")} />;
    if (view === "saved") return <SavedView saved={saved} openArtist={openArtist} toggleSave={toggleSave} />;
    return <ProfileView go={navigate} />;
  }, [view, artist, service, saved, booking]);
  if (intro !== "app") return <IntroFlow onFinish={() => { localStorage.setItem("saj-onboarded", "true"); setIntro("app"); }} />;
  const hideNav = ["portfolio", "service", "booking", "confirmation", "tracking"].includes(view);
  return <div className="mx-auto min-h-dvh max-w-[560px] bg-background shadow-[0_0_70px_color-mix(in_oklab,var(--berry-deep)_10%,transparent)]">{content}{!hideNav && <BottomNav view={view} go={navigate} />}</div>;
}