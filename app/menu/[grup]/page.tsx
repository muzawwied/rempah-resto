import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../../components/Reveal";
import { menuLengkap, grupDariSlug } from "../../../lib/menu";
import MenuLive from "../../../components/MenuLive";

export function generateStaticParams() {
  return menuLengkap.map((g) => ({ grup: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ grup: string }> }) {
  const { grup } = await params;
  const data = grupDariSlug(grup);
  return {
    title: data ? `${data.title} — Menu Rempah` : "Menu — Rempah",
  };
}

export default async function GrupPage({ params }: { params: Promise<{ grup: string }> }) {
  const { grup } = await params;
  const data = grupDariSlug(grup);
  if (!data) notFound();

  const index = menuLengkap.findIndex((g) => g.slug === grup);
  const sebelum = menuLengkap[index - 1];
  const sesudah = menuLengkap[index + 1];

  return (
    <main>
      <div className="page-top wrap">
        <nav className="crumb">
          <Link prefetch={false} href="/">Beranda</Link>
          <span>/</span>
          <Link prefetch={false} href="/menu">Menu</Link>
          <span>/</span>
          <span data-aktif="true">{data.title}</span>
        </nav>
        <h1 className="page-title page-title--sm" style={{ marginTop: 18 }}>
          {data.title}
        </h1>
        <p className="lede" style={{ marginTop: 18, maxWidth: "52ch" }}>
          {data.items.length} hidangan di bagian ini. Harga sudah termasuk pajak, belum termasuk biaya
          layanan.
        </p>
      </div>

      <div className="wrap" style={{ paddingTop: "clamp(26px,4vw,44px)", paddingBottom: "clamp(34px,5vw,64px)" }}>
        <Reveal>
          <MenuLive
            grup={data.slug}
            awal={data.items.map((d) => ({ nama: d.name, catatan: d.note, harga: d.price, grup: data.slug }))}
          />

          <div className="grup-nav">
            {sebelum ? (
              <Link prefetch={false} href={`/menu/${sebelum.slug}`}>
                <span className="label">Sebelumnya</span>
                <strong>{sebelum.title}</strong>
              </Link>
            ) : (
              <Link prefetch={false} href="/menu">
                <span className="label">Kembali</span>
                <strong>Menu lengkap</strong>
              </Link>
            )}
            {sesudah ? (
              <Link prefetch={false} href={`/menu/${sesudah.slug}`} className="grup-nav__next">
                <span className="label">Berikutnya</span>
                <strong>{sesudah.title}</strong>
              </Link>
            ) : (
              <Link prefetch={false} href="/reservasi" className="grup-nav__next">
                <span className="label">Lanjut</span>
                <strong>Reservasi</strong>
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
