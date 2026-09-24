import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft, ArrowRight, Bell, CalendarDays, Check, CheckCircle2, ChevronRight,
  Clock3, Compass, Heart, Home, MapPin, Menu, Search, Share2, SlidersHorizontal,
  Minus, PackagePlus, Plus, Sparkles, Star, UserRound, X,
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

function IconButton({ label, children, onClick, active = false }: { label: string; children: ReactNode; onClick?: () => void; active?: boolean }) {
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
  ] as const;
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
    const item = onboarding[slide] ?? onboarding[0];
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

function HomeView({ openArtist, openService, saved, toggleSave, go, upcoming }: { openArtist: (a: Artist) => void; openService: (s: Service) => void; saved: number[]; toggleSave: (id: number) => void; go: (v: View) => void; upcoming: { booking: { date: string; time: string; selection: BookingSelection } | null; artist: string } }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  return <div className="pb-28 animate-gentle-in">
    <Header />
    <section className="px-5 pb-6 pt-6">
      <p className="text-[11px] font-bold tracking-[.2em] text-primary">GOOD AFTERNOON, BRIDE-TO-BE</p>
      <h1 className="mt-3 max-w-sm font-display text-[40px] leading-[1.04]">Everything she needs for her big day.</h1>
    </section>
    <UpcomingBooking booking={upcoming.booking} artistName={upcoming.artist} go={go} />
    <HomeSearch openArtist={openArtist} openService={openService} />
    <section ref={scroller} className="pt-4">
      <div className="mb-4 flex items-end justify-between px-5"><div><p className="text-[10px] font-bold tracking-[.2em] text-primary">CURATED FOR YOU</p><h2 className="mt-1 font-display text-2xl">Trending bridal looks</h2></div><span className="text-xs text-muted-foreground">{current} / 8</span></div>
      <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-7" onScroll={(e) => setCurrent(Math.min(8, Math.max(1, Math.round(e.currentTarget.scrollLeft / (e.currentTarget.clientWidth * .82)) + 1)))}>{artists.map((artist) => <PortfolioCard key={artist.id} artist={artist} onOpen={() => openArtist(artist)} saved={saved.includes(artist.id)} onSave={() => toggleSave(artist.id)} />)}</div>
    </section>
    <section className="py-6"><div className="mb-4 flex items-end justify-between px-5"><div><p className="text-[10px] font-bold tracking-[.2em] text-primary">SIGNATURE SERVICES</p><h2 className="mt-1 font-display text-2xl">Finish the look</h2></div><Button variant="link" onClick={() => go("explore")}>See all</Button></div><div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">{services.map((s, i) => <button key={s.id} onClick={() => openService(s)} className="group relative aspect-[3/4] w-[62%] shrink-0 snap-start overflow-hidden rounded-[26px] text-left shadow-luxury transition-transform active:scale-[.98]"><img src={s.image} alt={s.name} loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-berry-deep/90 via-berry-deep/10 to-transparent" /><span className="absolute left-3 top-3 rounded-full border border-glass-border bg-glass px-3 py-1 text-[10px] font-bold tracking-[.15em] text-foreground backdrop-blur-xl">{i === 0 ? "MOST LOVED" : s.duration}</span><div className="absolute inset-x-2 bottom-2 rounded-[20px] border border-primary-foreground/25 bg-primary-foreground/10 p-3 text-primary-foreground backdrop-blur-xl"><h3 className="font-display text-lg leading-tight">{s.name}</h3><div className="mt-2 flex items-center justify-between"><span className="text-xs opacity-80">From <b className="text-sm opacity-100">₹{s.price.toLocaleString("en-IN")}</b></span><span className="grid size-8 place-items-center rounded-full bg-primary-foreground text-primary"><ArrowRight className="size-4" /></span></div></div></button>)}</div></section>
  </div>;
}

function HomeSearch({ openArtist, openService }: { openArtist: (a: Artist) => void; openService: (s: Service) => void }) {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("All");
  const q = query.trim().toLowerCase();
  const matchA = artists.filter((a) => (!q || `${a.studio} ${a.name} ${a.category} ${a.location}`.toLowerCase().includes(q)) && (category === "All" || a.category.includes(category.split(" ")[0] ?? category)));
  const matchS = services.filter((s) => q && s.name.toLowerCase().includes(q));
  const active = q || category !== "All";
  return <section className="px-5 pb-2">
    <div className="relative"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search artists, services, cities" className="h-14 rounded-full border-glass-border bg-glass pl-11 shadow-glass backdrop-blur-xl" />{query && <button aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="size-4" /></button>}</div>
    <div className="hide-scrollbar -mx-5 flex gap-2 overflow-auto px-5 py-4">{categories.map((c) => <Button key={c} size="sm" variant={category === c ? "default" : "glass"} className="shrink-0 rounded-full" onClick={() => setCategory(c)}>{c}</Button>)}</div>
    {active && <div className="animate-gentle-in space-y-2 rounded-3xl border border-glass-border bg-glass p-2 shadow-glass backdrop-blur-xl">
      {matchS.map((s) => <button key={`s${s.id}`} onClick={() => openService(s)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center rounded-2xl p-3 text-left hover:bg-muted"><span className="min-w-0"><b className="block truncate text-sm">{s.name}</b><small className="text-muted-foreground">Service · from ₹{s.price.toLocaleString("en-IN")}</small></span><ChevronRight className="size-4" /></button>)}
      {matchA.map((a) => <button key={a.id} onClick={() => openArtist(a)} className="grid w-full grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl p-2 text-left hover:bg-muted"><img src={a.image} alt="" className="h-12 w-12 rounded-xl object-cover" /><span className="min-w-0"><b className="block truncate text-sm">{a.studio}</b><small className="text-muted-foreground">{a.category} · {a.location}</small></span><ChevronRight className="size-4" /></button>)}
      {!matchA.length && !matchS.length && <p className="p-4 text-center text-sm text-muted-foreground">No matches yet — try another word.</p>}
    </div>}
  </section>;
}

function ExploreView({ openArtist, saved, toggleSave }: { openArtist: (a: Artist) => void; saved: number[]; toggleSave: (id: number) => void }) {
  const [liked, setLiked] = useState<number[]>([]);
  const glass = "border border-primary-foreground/25 bg-primary-foreground/15 text-primary-foreground backdrop-blur-xl";
  return <div className="fixed inset-0 z-40 mx-auto max-w-[560px] bg-berry-deep">
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 pt-6">
      <span className="font-display text-2xl text-primary-foreground">Reels</span>
      <span className={cn("rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[.18em]", glass)}>BRIDAL EDIT</span>
    </div>
    <div className="hide-scrollbar h-dvh snap-y snap-mandatory overflow-y-auto">
      {artists.map((a, i) => { const isLiked = liked.includes(a.id); const isSaved = saved.includes(a.id); return <section key={a.id} className="relative h-dvh snap-start snap-always overflow-hidden">
        <img src={a.image} alt={a.studio} loading={i < 2 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full scale-105 object-cover" style={{ objectPosition: `${[50, 30, 70][i % 3]}% ${[20, 40, 30][i % 3]}%` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-berry-deep/40 via-transparent to-berry-deep/90" />
        <div className="absolute bottom-[300px] right-4 z-10 flex flex-col items-center gap-4">
          {[{ l: isLiked ? "Unlike" : "Like", icon: <Heart className={cn("size-5", isLiked && "fill-current")} />, n: a.reviews * 7 + (isLiked ? 1 : 0), on: () => setLiked((o) => isLiked ? o.filter((x) => x !== a.id) : [...o, a.id]) },
            { l: isSaved ? "Unsave" : "Save", icon: <Sparkles className={cn("size-5", isSaved && "fill-current")} />, n: isSaved ? "Saved" : "Save", on: () => toggleSave(a.id) },
            { l: "Share", icon: <Share2 className="size-5" />, n: "Share", on: () => navigator.share?.({ title: a.studio }).catch(() => {}) }].map((b) =>
            <button key={b.l} aria-label={b.l} onClick={b.on} className="flex flex-col items-center gap-1 text-primary-foreground"><span className={cn("grid h-12 w-12 place-items-center rounded-full shadow-glass transition-transform active:scale-90", glass)}>{b.icon}</span><span className="text-[10px] font-semibold">{b.n}</span></button>)}
        </div>
        <div className="absolute inset-x-3 bottom-24 z-10">
          <div className={cn("rounded-[26px] p-4 shadow-luxury", glass)}>
            <div className="flex items-center gap-3"><img src={a.image} alt="" className="h-10 w-10 rounded-full border border-primary-foreground/50 object-cover" /><div className="min-w-0 flex-1"><h2 className="truncate font-display text-xl leading-tight">{a.studio}</h2><p className="text-[11px] text-primary-foreground/75"><Star className="mr-1 inline size-3 fill-current" />{a.rating} · {a.category} · {a.location}</p></div></div>
            <p className="mt-3 text-sm leading-snug text-primary-foreground/90">{a.tagline}</p>
            <Button onClick={() => openArtist(a)} className="mt-3 h-11 w-full rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">View portfolio <ArrowRight className="size-4" /></Button>
          </div>
        </div>
        <span className="absolute right-5 top-16 z-10 text-[10px] font-semibold tracking-[.2em] text-primary-foreground/70">{String(i + 1).padStart(2, "0")} / {String(artists.length).padStart(2, "0")}</span>
      </section>; })}
    </div>
  </div>;
}

function PortfolioView({ artist, back, openService, saved, toggleSave }: { artist: Artist; back: () => void; openService: (s: Service) => void; saved: boolean; toggleSave: () => void }) {
  const gallery = [artist.image, ananyaImage, meherImage, rheaImage, artist.image, meherImage]; const [category, setCategory] = useState("All"); const [lightbox, setLightbox] = useState<number | null>(null);
  return <div className="animate-gentle-in pb-28"><section className="relative h-[67vh] min-h-[520px]"><img src={artist.image} alt={`${artist.studio} bridal work`} width={1024} height={1280} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-berry-deep via-transparent to-berry-deep/20" /><div className="absolute inset-x-0 top-0 flex justify-between p-4"><IconButton label="Go back" onClick={back}><ArrowLeft /></IconButton><div className="flex gap-2"><IconButton label="Share"><Share2 /></IconButton><IconButton label="Save artist" active={saved} onClick={toggleSave}><Heart className={cn(saved && "fill-current")} /></IconButton></div></div><div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground"><span className="rounded-full bg-glass/20 px-3 py-1 text-[10px] tracking-[.15em] backdrop-blur">VERIFIED ARTIST</span><h1 className="mt-3 font-display text-4xl">{artist.studio}</h1><p className="mt-2 font-display text-xl italic text-primary-foreground/85">“{artist.tagline}”</p><div className="mt-4 flex flex-wrap gap-4 text-xs"><span>★ {artist.rating} · {artist.reviews} reviews</span><span>{artist.experience}</span><span>{artist.location}</span></div></div></section>
    <section className="py-7"><div className="px-5"><p className="text-[10px] font-bold tracking-[.2em] text-primary">SELECTED WORK</p><h2 className="mt-1 font-display text-3xl">Portfolio</h2></div><div className="hide-scrollbar flex gap-2 overflow-auto px-5 py-4">{["All", "Bridal", "Engagement", "Reception", "Haldi", "Sangeet"].map((c) => <Button key={c} variant={category === c ? "default" : "glass"} className="shrink-0" onClick={() => setCategory(c)}>{c}</Button>)}</div><div className="grid grid-cols-2 gap-2 px-3">{gallery.map((img, i) => <button key={i} onClick={() => setLightbox(i)} className={cn("overflow-hidden rounded-xl", i % 3 === 0 ? "row-span-2" : "")}><img src={img} alt={`${category} look ${i + 1}`} loading="lazy" width={1024} height={1280} className={cn("w-full object-cover", i % 3 === 0 ? "h-full min-h-80" : "aspect-square")} /></button>)}</div></section>
    <section className="border-y border-border px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">ABOUT THE ARTIST</p><p className="mt-3 font-display text-2xl leading-relaxed">{artist.bio}</p></section>
    <section className="px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">CURATED MENU</p><h2 className="mt-1 font-display text-3xl">Services</h2><div className="mt-5 space-y-3">{services.slice(0, 4).map((s) => <button key={s.id} onClick={() => openService(s)} className="grid w-full grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-4 rounded-[22px] border border-glass-border bg-glass p-2.5 pr-4 text-left shadow-glass backdrop-blur-xl transition-transform active:scale-[.98]"><img src={s.image} alt="" loading="lazy" width={1024} height={1280} className="size-[76px] rounded-2xl object-cover" /><span className="min-w-0"><b className="block truncate font-display text-lg font-normal">{s.name}</b><small className="mt-1 flex items-center gap-1 text-muted-foreground"><Clock3 className="size-3" />{s.duration}</small></span><span className="text-right"><b className="block text-sm">₹{s.price.toLocaleString("en-IN")}</b><ChevronRight className="ml-auto mt-1 size-4 text-primary" /></span></button>)}</div></section>
    <section className="mx-5 rounded-2xl bg-nude p-5"><div className="flex gap-1 text-primary">★★★★★</div><blockquote className="mt-3 font-display text-xl">“From the trial to the final touch, I felt completely understood.”</blockquote><p className="mt-3 text-xs text-muted-foreground">Mira S. · December bride</p></section>
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-border bg-glass p-3 backdrop-blur-xl"><div className="mx-auto grid max-w-[430px] grid-cols-[1fr_auto] items-center gap-3"><div><small className="text-muted-foreground">Bridal Makeup</small><b className="block">₹25,000</b></div><Button size="lg" onClick={() => openService(services[0])}>Book now <ArrowRight /></Button></div></div>
    {lightbox !== null && <div className="fixed inset-0 z-[80] flex items-center bg-berry-deep" onClick={() => setLightbox(null)}><img src={gallery[lightbox] ?? artist.image} alt="Portfolio detail" className="max-h-dvh w-full object-contain" /><div className="absolute right-4 top-4"><IconButton label="Close gallery" onClick={() => setLightbox(null)}><X /></IconButton></div><span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-primary-foreground">{lightbox + 1} / {gallery.length}</span></div>}
  </div>;
}

function ServiceView({ service, artist, back, book, openService }: { service: Service; artist: Artist; back: () => void; book: () => void; openService: (s: Service) => void }) {
  const extras = services.filter((s) => s.id !== service.id && metaOf(s.id).type !== metaOf(service.id).type).slice(0, 3);
  return <div className="animate-gentle-in pb-32">
    <section className="relative h-[72dvh] min-h-[480px]"><img src={service.image} alt={service.name} width={1024} height={1280} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-berry-deep via-berry-deep/20 to-berry-deep/30" />
      <div className="absolute inset-x-4 top-4 flex justify-between"><IconButton label="Go back" onClick={back}><ArrowLeft /></IconButton><IconButton label="Share"><Share2 /></IconButton></div>
      <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground"><span className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-[10px] font-bold tracking-[.2em] backdrop-blur-xl">{metaOf(service.id).type.toUpperCase()}</span><h1 className="mt-4 font-display text-5xl leading-none">{service.name}</h1><p className="mt-3 max-w-sm text-sm leading-relaxed opacity-85">{service.description}</p>
        <div className="mt-5 grid grid-cols-3 divide-x divide-primary-foreground/20 rounded-[22px] border border-primary-foreground/25 bg-primary-foreground/10 py-3 text-center backdrop-blur-xl"><div><small className="text-[10px] opacity-70">FROM</small><b className="block">₹{service.price.toLocaleString("en-IN")}</b></div><div><small className="text-[10px] opacity-70">DURATION</small><b className="block">{service.duration}</b></div><div><small className="text-[10px] opacity-70">RATING</small><b className="block">★ {metaOf(service.id).rating}</b></div></div></div>
    </section>
    <section className="px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">PACKAGE CONTENTS</p><h2 className="mt-1 font-display text-3xl">What’s included</h2><div className="mt-5 grid grid-cols-2 gap-3">{service.inclusions.map((x, i) => <div key={x} className="rounded-[20px] border border-glass-border bg-glass p-4 shadow-glass backdrop-blur-xl"><span className="grid size-8 place-items-center rounded-full bg-accent text-primary"><Check className="size-4" /></span><b className="mt-3 block text-sm">{x}</b><small className="text-muted-foreground">Step {i + 1}</small></div>)}</div></section>
    <section className="px-5 pb-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">COMPLETE THE LOOK</p><h2 className="mt-1 font-display text-3xl">Popular add-ons</h2><div className="mt-5 space-y-3">{extras.map((s) => <button key={s.id} onClick={() => openService(s)} className="grid w-full grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 rounded-[22px] border border-glass-border bg-glass p-2.5 pr-4 text-left shadow-glass backdrop-blur-xl"><img src={s.image} alt="" loading="lazy" className="size-16 rounded-2xl object-cover" /><span><b className="font-display text-lg font-normal">{s.name}</b><small className="block text-muted-foreground">{s.duration}</small></span><b className="text-sm text-primary">+₹{s.price.toLocaleString("en-IN")}</b></button>)}</div><p className="mt-3 text-xs text-muted-foreground">Add these or build a full package in the next step.</p></section>
    <section className="px-5 pb-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">YOUR ARTIST</p><div className="mt-4 overflow-hidden rounded-[26px] bg-primary text-primary-foreground shadow-luxury"><div className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 p-4"><img src={artist.image} alt={artist.name} loading="lazy" className="h-28 w-full rounded-2xl object-cover" /><div className="py-1"><h3 className="font-display text-2xl leading-tight">{artist.studio}</h3><p className="mt-1 flex items-center gap-1 text-xs opacity-75"><MapPin className="size-3" />{artist.location} · {artist.experience}</p><p className="mt-3 text-sm"><Star className="inline size-4 fill-current" /> {artist.rating} <span className="opacity-70">({artist.reviews} reviews)</span></p></div></div><p className="border-t border-primary-foreground/15 px-4 py-4 text-sm leading-relaxed opacity-85">{artist.bio}</p></div></section>
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 p-3"><div className="mx-auto grid max-w-[520px] grid-cols-[1fr_auto] items-center gap-3 rounded-[26px] border border-glass-border bg-glass p-3 pl-5 shadow-luxury backdrop-blur-2xl"><div><small className="text-muted-foreground">Starting at</small><b className="block font-display text-2xl">₹{service.price.toLocaleString("en-IN")}</b></div><Button size="lg" variant="luxury" className="h-14 px-7" onClick={book}>Book now <ArrowRight /></Button></div></div>
  </div>;
}

const serviceTypes = ["All", "Bridal", "Celebrations", "Hair & Styling", "Skin"] as const;
const serviceMeta: Record<number, { type: (typeof serviceTypes)[number]; popularity: number; rating: number }> = {
  1: { type: "Bridal", popularity: 98, rating: 4.9 }, 2: { type: "Celebrations", popularity: 86, rating: 4.8 }, 3: { type: "Celebrations", popularity: 80, rating: 4.8 },
  4: { type: "Hair & Styling", popularity: 90, rating: 4.9 }, 5: { type: "Hair & Styling", popularity: 75, rating: 4.7 }, 6: { type: "Skin", popularity: 70, rating: 4.8 },
  7: { type: "Celebrations", popularity: 78, rating: 4.7 }, 8: { type: "Celebrations", popularity: 72, rating: 4.7 }, 9: { type: "Hair & Styling", popularity: 64, rating: 4.6 }, 10: { type: "Bridal", popularity: 84, rating: 4.9 },
};
const metaOf = (id: number) => serviceMeta[id] ?? { type: "Bridal" as const, popularity: 50, rating: 4.7 };
type SortKey = "popular" | "low" | "high";

function ServicesGrid({ openService, go }: { openService: (s: Service) => void; go: (v: View) => void }) {
  const [type, setType] = useState<(typeof serviceTypes)[number]>("All"); const [sort, setSort] = useState<SortKey>("popular");
  const list = services.filter((s) => type === "All" || metaOf(s.id).type === type).sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : metaOf(b.id).popularity - metaOf(a.id).popularity);
  return <section className="py-6"><div className="mb-4 flex items-end justify-between px-5"><div><p className="text-[10px] font-bold tracking-[.2em] text-primary">SIGNATURE SERVICES</p><h2 className="mt-1 font-display text-2xl">Finish the look</h2></div><Button variant="link" onClick={() => go("explore")}>See all</Button></div>
    <div className="hide-scrollbar flex gap-2 overflow-x-auto px-5 pb-3">{serviceTypes.map((t) => <button key={t} onClick={() => setType(t)} className={cn("shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors", type === t ? "border-primary bg-primary text-primary-foreground shadow-luxury" : "border-glass-border bg-glass text-foreground backdrop-blur-xl")}>{t}</button>)}</div>
    <div className="mx-5 mb-4 grid grid-cols-3 rounded-full border border-glass-border bg-glass p-1 shadow-glass backdrop-blur-xl">{([["popular", "Popular"], ["low", "Price ↑"], ["high", "Price ↓"]] as const).map(([k, l]) => <button key={k} onClick={() => setSort(k)} className={cn("rounded-full py-2 text-xs font-semibold transition-colors", sort === k ? "bg-accent text-primary" : "text-muted-foreground")}>{l}</button>)}</div>
    <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">{list.map((s, i) => <button key={s.id} onClick={() => openService(s)} className="group relative aspect-[3/4] w-[62%] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-[26px] text-left shadow-luxury transition-transform active:scale-[.98]"><img src={s.image} alt={s.name} loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-berry-deep/90 via-berry-deep/10 to-transparent" /><span className="absolute left-3 top-3 rounded-full border border-glass-border bg-glass px-3 py-1 text-[10px] font-bold tracking-[.15em] text-foreground backdrop-blur-xl">{sort === "popular" && i === 0 ? "MOST LOVED" : metaOf(s.id).type.toUpperCase()}</span><div className="absolute inset-x-2 bottom-2 rounded-[20px] border border-primary-foreground/25 bg-primary-foreground/10 p-3 text-primary-foreground backdrop-blur-xl"><h3 className="font-display text-lg leading-tight">{s.name}</h3><p className="mt-1 text-[11px] opacity-75">{s.duration} · ★ {metaOf(s.id).rating}</p><div className="mt-2 flex items-center justify-between"><span className="text-xs opacity-80">From <b className="text-sm opacity-100">₹{s.price.toLocaleString("en-IN")}</b></span><span className="grid size-8 place-items-center rounded-full bg-primary-foreground text-primary"><ArrowRight className="size-4" /></span></div></div></button>)}</div>
  </section>;
}

function UpcomingBooking({ booking, artistName, go }: { booking: { date: string; time: string; selection: BookingSelection } | null; artistName: string; go: (v: View) => void }) {
  if (!booking) return <section className="px-5 pb-6"><button onClick={() => go("explore")} className="flex w-full items-center justify-between rounded-[26px] border border-glass-border bg-glass p-5 text-left shadow-glass backdrop-blur-xl"><span><p className="text-[10px] font-bold tracking-[.2em] text-primary">NO UPCOMING BOOKING</p><b className="mt-1 block font-display text-xl font-normal">Plan your first look</b></span><ArrowRight className="text-primary" /></button></section>;
  return <section className="px-5 pb-6"><div className="relative overflow-hidden rounded-[28px] bg-primary p-5 text-primary-foreground shadow-luxury"><div className="absolute -right-10 -top-10 size-40 rounded-full bg-rose/40 blur-3xl" /><div className="relative"><div className="flex items-center justify-between"><p className="text-[10px] font-bold tracking-[.2em] opacity-80">UPCOMING BOOKING</p><span className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-[10px] font-bold backdrop-blur-xl">CONFIRMED</span></div><h2 className="mt-3 font-display text-3xl leading-tight">{booking.selection.label}</h2><p className="mt-1 text-sm opacity-80">with {artistName}</p><div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-3 backdrop-blur-xl"><CalendarDays className="size-4 opacity-80" /><b className="mt-1 block text-sm">{booking.date}</b></div><div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-3 backdrop-blur-xl"><Clock3 className="size-4 opacity-80" /><b className="mt-1 block text-sm">{booking.time}</b></div></div><div className="mt-4 flex items-center justify-between"><b className="font-display text-xl">₹{booking.selection.total.toLocaleString("en-IN")}</b><Button variant="glass" size="sm" onClick={() => go("tracking")}>Track <ArrowRight /></Button></div></div></div></section>;
}

type BookingSelection = { label: string; items: string[]; total: number };

function BookingFlow({ service, artist, cancel, confirm }: { service: Service; artist: Artist; cancel: () => void; confirm: (date: string, time: string, selection: BookingSelection) => void }) {
  const [step, setStep] = useState(1); const [date, setDate] = useState<string>(dates[0].full); const [time, setTime] = useState("");
  const [serviceMode, setServiceMode] = useState<"addons" | "package">("addons");
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const addOns = services.filter((item) => item.id !== service.id).slice(0, 4);
  const toggleExtra = (id: number) => setSelectedExtras((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const chosenExtras = addOns.filter((item) => selectedExtras.includes(item.id));
  const selection: BookingSelection = {
    label: serviceMode === "package" && chosenExtras.length ? "Custom bridal package" : service.name,
    items: [service.name, ...chosenExtras.map((item) => item.name)],
    total: service.price + chosenExtras.reduce((sum, item) => sum + item.price, 0),
  };
  return <div className="min-h-dvh animate-gentle-in pb-28"><Header title="Book your moment" onBack={() => step > 1 ? setStep(step - 1) : cancel()} /><div className="px-5 pt-5"><div className="flex gap-2">{[1,2,3].map((n) => <span key={n} className={cn("h-1 flex-1 rounded-full", n <= step ? "bg-primary" : "bg-muted")} />)}</div><div className="mt-2 flex justify-between text-[9px] font-bold tracking-[.12em] text-muted-foreground"><span>SERVICE</span><span>DATE & TIME</span><span>DETAILS</span></div></div>
    {step === 1 && <section className="px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">STEP ONE</p><h1 className="mt-2 font-display text-4xl">Make it yours.</h1><div className="mt-6 grid grid-cols-[90px_minmax(0,1fr)] gap-4 rounded-2xl bg-card p-3 shadow-sm"><img src={service.image} alt="" className="h-28 w-full rounded-xl object-cover" /><div className="py-2"><h2 className="font-display text-xl">{service.name}</h2><p className="mt-2 text-xs text-muted-foreground">with {artist.studio}</p><p className="mt-4 font-semibold">₹{service.price.toLocaleString("en-IN")}</p></div></div><div className="mt-7 grid grid-cols-2 rounded-2xl bg-muted p-1"><Button variant={serviceMode === "addons" ? "default" : "ghost"} className="rounded-xl" onClick={() => { setServiceMode("addons"); setSelectedExtras([]); }}><Sparkles className="size-4" /> Add-ons</Button><Button variant={serviceMode === "package" ? "default" : "ghost"} className="rounded-xl" onClick={() => setServiceMode("package")}><PackagePlus className="size-4" /> Create package</Button></div><div className="mt-6"><h2 className="font-display text-2xl">{serviceMode === "addons" ? "Add finishing touches" : "Build your package"}</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{serviceMode === "addons" ? "Choose any extras you’d like with this service." : "Combine services for a celebration planned your way."}</p><div className="mt-4 space-y-2">{addOns.map((item) => { const selected = selectedExtras.includes(item.id); return <div key={item.id} className={cn("grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-4", selected ? "border-primary bg-accent" : "border-border bg-card")}><div><b className="text-sm">{item.name}</b><p className="mt-1 text-xs text-muted-foreground">{item.duration} · ₹{item.price.toLocaleString("en-IN")}</p></div><Button size="icon" variant={selected ? "default" : "outline"} aria-label={selected ? `Remove ${item.name}` : `Add ${item.name}`} onClick={() => toggleExtra(item.id)}>{selected ? <Minus /> : <Plus />}</Button></div>; })}</div></div><div className="mt-6 flex items-end justify-between rounded-2xl bg-nude p-4"><div><p className="text-xs text-muted-foreground">{selection.items.length} {selection.items.length === 1 ? "service" : "services"}</p><b className="font-display text-xl">{selection.label}</b></div><strong className="text-lg">₹{selection.total.toLocaleString("en-IN")}</strong></div></section>}
    {step === 2 && <section className="px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">OCTOBER 2026</p><h1 className="mt-2 font-display text-4xl">Choose a date.</h1><div className="hide-scrollbar mt-6 flex gap-2 overflow-auto">{dates.map((d) => <Button key={d.day} variant={date === d.full ? "default" : "outline"} onClick={() => setDate(d.full)} className="h-20 w-16 shrink-0 flex-col rounded-2xl"><small>{d.dow}</small><b className="text-lg">{d.day}</b></Button>)}</div><h2 className="mt-9 font-display text-2xl">Available times</h2><p className="mt-1 text-xs text-muted-foreground">Availability checked moments ago</p><div className="mt-4 grid grid-cols-2 gap-3">{slots.map((slot) => <Button key={slot.time} variant={time === slot.time ? "default" : "outline"} disabled={!slot.available} onClick={() => setTime(slot.time)} className="h-14 flex-col rounded-2xl"><span>{slot.time}</span><small className="text-[9px]">{slot.available ? "AVAILABLE" : "BOOKED"}</small></Button>)}</div></section>}
    {step === 3 && <section className="px-5 py-8"><p className="text-[10px] font-bold tracking-[.2em] text-primary">STEP THREE</p><h1 className="mt-2 font-display text-4xl">A few details.</h1><div className="mt-6 space-y-3"><Input aria-label="Name" defaultValue="Ayesha Khan" placeholder="Name" className="h-14 rounded-2xl bg-card px-4" /><Input aria-label="Phone" defaultValue="+91 98765 43210" placeholder="Phone" className="h-14 rounded-2xl bg-card px-4" /><Input aria-label="Event type" defaultValue="Wedding" placeholder="Event type" className="h-14 rounded-2xl bg-card px-4" /><Input aria-label="Venue" defaultValue="The Oberoi Grand, Kolkata" placeholder="Venue" className="h-14 rounded-2xl bg-card px-4" /><Textarea aria-label="Additional notes" placeholder="Additional notes (optional)" className="min-h-24 rounded-2xl bg-card p-4" /></div><div className="mt-6 rounded-2xl bg-nude p-4 text-sm"><b className="font-display text-lg">Your booking</b><p className="mt-2 text-muted-foreground">{selection.items.join(" + ")}<br />{date} · {time} · {artist.studio}</p><p className="mt-3 font-semibold">Total · ₹{selection.total.toLocaleString("en-IN")}</p></div></section>}
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-border bg-glass p-3 backdrop-blur-xl"><Button size="lg" disabled={step === 2 && !time} className="mx-auto flex w-full max-w-[400px]" onClick={() => step < 3 ? setStep(step + 1) : confirm(date, time, selection)}>{step === 3 ? "Confirm booking" : "Continue"}<ArrowRight /></Button></div>
  </div>;
}

function Confirmation({ service, artist, date, time, selection, go }: { service: Service; artist: Artist; date: string; time: string; selection: BookingSelection; go: (v: View) => void }) {
  return <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-primary px-6 text-center text-primary-foreground"><span className="animate-petal absolute left-[15%] top-0 text-2xl text-primary-foreground/30">✦</span><span className="animate-petal absolute left-[75%] top-[-20%] text-lg text-primary-foreground/20 [animation-delay:2s]">✦</span><div className="animate-gentle-in w-full max-w-sm"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10"><Check className="size-9" /></div><h1 className="mt-7 font-display text-4xl">Your moment is booked.</h1><p className="mt-3 text-xs tracking-[.16em] text-primary-foreground/70">BOOKING ID · SS-120426</p><div className="mt-8 rounded-3xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 text-left backdrop-blur-xl"><Detail label="Service" value={selection.label || service.name} /><Detail label="Includes" value={selection.items.join(", ")} /><Detail label="Total" value={`₹${selection.total.toLocaleString("en-IN")}`} /><Detail label="Date & time" value={`${date} · ${time}`} /><Detail label="Status" value="CONFIRMED" /><Detail label="Artist" value={artist.studio} /><Detail label="Location" value={artist.location} /></div><Button variant="glass" size="lg" className="mt-6 w-full" onClick={() => go("tracking")}>View booking</Button><Button variant="ghost" className="mt-2 text-primary-foreground" onClick={() => go("home")}>Back to home</Button><p className="mt-10 font-display text-xl text-primary-foreground/80">Take a breath.<br />One more thing checked off.</p></div></main>;
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
  const [artist, setArtist] = useState(artists[0]); const [service, setService] = useState(services[0]); const [saved, setSaved] = useState<number[]>([2]); const [booking, setBooking] = useState<{ date: string; time: string; selection: BookingSelection }>({ date: dates[0].full, time: "10:00 AM", selection: { label: services[0].name, items: [services[0].name], total: services[0].price } });
  useEffect(() => { const seen = localStorage.getItem("saj-onboarded"); if (seen) setIntro("app"); const stored = localStorage.getItem("saj-saved"); if (stored) { try { setSaved(JSON.parse(stored)); } catch { /* use defaults */ } } }, []);
  const navigate = (next: View) => { setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggleSave = (id: number) => setSaved((old) => { const next = old.includes(id) ? old.filter((x) => x !== id) : [...old, id]; localStorage.setItem("saj-saved", JSON.stringify(next)); return next; });
  const openArtist = (a: Artist) => { setArtist(a); navigate("portfolio"); }; const openService = (s: Service) => { setService(s); navigate("service"); };
  const content = useMemo(() => {
    if (view === "home") return <HomeView openArtist={openArtist} openService={openService} saved={saved} toggleSave={toggleSave} go={navigate} />;
    if (view === "explore") return <ExploreView openArtist={openArtist} saved={saved} toggleSave={toggleSave} />;
    if (view === "portfolio") return <PortfolioView artist={artist} back={() => navigate("home")} openService={openService} saved={saved.includes(artist.id)} toggleSave={() => toggleSave(artist.id)} />;
    if (view === "service") return <ServiceView service={service} back={() => navigate("portfolio")} book={() => navigate("booking")} />;
    if (view === "booking") return <BookingFlow service={service} artist={artist} cancel={() => navigate("service")} confirm={(date, time, selection) => { setBooking({ date, time, selection }); localStorage.setItem("saj-booking", JSON.stringify({ date, time, selection, artist: artist.studio })); navigate("confirmation"); }} />;
    if (view === "confirmation") return <Confirmation service={service} artist={artist} date={booking.date} time={booking.time} selection={booking.selection} go={navigate} />;
    if (view === "bookings") return <BookingsView go={navigate} />;
    if (view === "tracking") return <TrackingView back={() => navigate("bookings")} />;
    if (view === "saved") return <SavedView saved={saved} openArtist={openArtist} toggleSave={toggleSave} />;
    return <ProfileView go={navigate} />;
  }, [view, artist, service, saved, booking]);
  if (intro !== "app") return <IntroFlow onFinish={() => { localStorage.setItem("saj-onboarded", "true"); setIntro("app"); }} />;
  const hideNav = ["portfolio", "service", "booking", "confirmation", "tracking"].includes(view);
  return <div className="mx-auto min-h-dvh max-w-[560px] bg-background shadow-[0_0_70px_color-mix(in_oklab,var(--berry-deep)_10%,transparent)]">{content}{!hideNav && <BottomNav view={view} go={navigate} />}</div>;
}