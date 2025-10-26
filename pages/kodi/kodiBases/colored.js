import Image from "next/image";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { colorBasesKodi } from "@/lib/kodi/baseKodi/colorBasesKodi";

export default function ColoredBasesPage() {
  const { t } = useTranslation("colorBasesKodi");

  return (
    <>
      <Head>
        <title>{t("colorBasesKodi.title")} | Kodi and More</title>
      </Head>

      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          {t("colorBasesKodi.title")}
        </h1>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colorBasesKodi.map((base) => (
            <li
              key={base.id}
              className="border rounded-2xl shadow-md hover:shadow-lg transition p-4 bg-white"
            >
              <Image
                src={base.image}
                alt={t(base.nameKey)}
                width={320}
                height={320}
                className="rounded-xl object-cover"
              />
              <h2 className="mt-4 text-lg font-medium">{t(base.nameKey)}</h2>
              <p className="text-gray-700 font-semibold mt-2">
                {base.price} грн
              </p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["colorBasesKodi"])),
    },
  };
}
