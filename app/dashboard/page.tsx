"use client";

import React from "react";
import { Button, ScrollShadow, Spacer, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

import SidebarDrawer from "./sidebar-drawer";
import { sectionItemsWithTeams } from "./sidebar-items";
import Sidebar from "./sidebar";
import TeamAvatar from "./team-avatar";

import { AuthService } from "@/services";
import { useUser } from "@/contexts/user";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function Component() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await AuthService.signOut();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      router.push("/auth/sign-in");
    }
  };

  const name =
    user?.firstName && user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : "";

  const content = (
    <div className="relative flex flex-col flex-1 h-full p-6 w-72">
      <div className="flex items-center gap-2 px-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full">
          <Image alt="logo" height={40} src="/logo192.png" width={40} />
        </div>
        <span className="font-medium text-md text-foreground">
          MyTripAssistant B2B
        </span>
      </div>
      <Spacer y={8} />
      <div className="flex items-center gap-3 px-3">
        <TeamAvatar isBordered name={name} />
        <div className="flex flex-col">
          <p className="w-[10rem] font-medium truncate text-small text-default-600">
            {name || user?.email}
          </p>
          <p className="text-tiny text-default-400">Admin</p>
        </div>
      </div>

      <Spacer y={8} />

      <ScrollShadow className="h-full max-h-full py-6 pr-6 -mr-6">
        <Sidebar defaultSelectedKey="dashboard" items={sectionItemsWithTeams} />
      </ScrollShadow>

      <Spacer y={8} />
      <div className="flex flex-col mt-auto">
        <Button
          fullWidth
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <Icon
              className="text-default-500"
              icon="solar:info-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Help & Information
        </Button>
        <Button
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          isDisabled={isLoading}
          isLoading={isLoading}
          startContent={
            <Icon
              className="rotate-180 text-default-500"
              icon="solar:minus-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
          onPress={() => handleLogout()}
        >
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex w-full !h-dvh overflow-hidden">
      <SidebarDrawer
        className=" !border-r-small border-divider"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className="flex-col flex-1 w-full p-4">
        <header className="flex items-center h-16 gap-2 px-4 rounded-medium border-small border-divider">
          <Button
            isIconOnly
            className="flex sm:hidden"
            size="sm"
            variant="light"
            onPress={onOpen}
          >
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:hamburger-menu-outline"
              width={24}
            />
          </Button>
          <Breadcrumbs size="lg">
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Apps</BreadcrumbItem>
            <BreadcrumbItem>App 01</BreadcrumbItem>
          </Breadcrumbs>
        </header>
        <main className="w-full h-full mt-4 overflow-visible">
          <div className="flex h-[90%] w-full flex-col gap-4 rounded-medium border-small border-divider">
            <ScrollShadow className="h-full">
              <p className="p-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia eaque cum voluptate, natus incidunt sequi id ipsam
                magnam consectetur dicta quaerat a expedita, pariatur quisquam.
                Error nobis totam explicabo natus libero? Non quidem dicta ullam
                sapiente sit maiores, pariatur rem magni aperiam voluptate neque
                excepturi nostrum eos temporibus ipsa, sint amet fuga quo
                necessitatibus! Perferendis illum, soluta architecto quas harum,
                iure nesciunt earum impedit odio quasi, illo nemo! Pariatur
                assumenda enim amet. Eligendi sit harum perspiciatis! Suscipit
                voluptas veniam ab iste animi, beatae neque, alias corrupti
                maxime accusamus consequuntur. Mollitia rem asperiores quas
                nihil enim, consequuntur nostrum blanditiis officiis quidem
                praesentium aperiam ratione nemo perferendis placeat ut beatae
                dolores atque. Voluptate quo natus excepturi beatae! Obcaecati,
                necessitatibus, non temporibus amet soluta nobis magnam ab nihil
                maiores aliquid architecto rerum, nemo reiciendis! Consequatur
                iste ea accusamus dignissimos omnis magnam aliquid tenetur harum
                cum? Exercitationem minus perspiciatis earum veniam provident
                hic neque blanditiis excepturi aliquid voluptatem totam illo
                accusamus, numquam expedita necessitatibus asperiores
                dignissimos. Expedita magni, ipsa at maxime sapiente ab adipisci
                explicabo iusto deserunt fuga odit quia veniam qui quidem
                aliquid animi unde in facere aspernatur. Suscipit ipsam quaerat
                natus ratione aperiam, porro sequi? Asperiores esse recusandae
                inventore ipsa, id perferendis alias exercitationem nostrum?
                Possimus impedit sed dicta, quisquam et distinctio alias nostrum
                recusandae quasi eos cupiditate magni sequi expedita assumenda
                culpa accusantium eaque corporis quod nesciunt! Quasi, dolorem
                voluptatibus impedit, deserunt laborum consequuntur totam
                repellat recusandae vitae assumenda nihil error eveniet culpa
                libero laudantium tempora voluptatum animi ratione amet
                aspernatur quae placeat dignissimos veniam. Officia sed
                reprehenderit similique voluptatum corrupti quas sapiente veniam
                doloremque nobis deleniti nulla, non sequi inventore rem
                blanditiis aliquid sit vel enim culpa. Illo accusantium vitae
                fuga obcaecati autem tempore dicta deleniti molestias at, quia
                odit laboriosam quidem maiores itaque quos, error ut eaque id!
                Sapiente similique ratione labore numquam architecto, mollitia
                et saepe sed deleniti tempore esse molestias impedit quam fugit
                nam maiores reiciendis vero ea incidunt doloribus voluptate!
                Quas aliquam quisquam inventore obcaecati consequuntur hic
                assumenda sit minus quod voluptatibus, facere, quaerat dolores
                deserunt, modi in recusandae. Nostrum animi consequatur cum
                incidunt voluptates saepe similique facilis nisi, molestiae at
                eius repudiandae quas officia, inventore sunt sequi dignissimos,
                exercitationem blanditiis? Eaque expedita perferendis
                aspernatur! Odit cumque, sapiente aut ut ipsum deleniti, et quis
                facilis itaque natus magni modi, ipsam culpa. A nihil itaque
                eius deleniti ab maiores dicta id incidunt, suscipit voluptates
                molestiae perferendis aliquid totam dolores hic ex saepe aperiam
                dolore veniam voluptas sit nemo recusandae accusantium? Nostrum
                quod, animi dolorem quae provident cumque magnam eveniet
                consequatur. Iure facilis impedit reprehenderit odit beatae
                molestiae amet quisquam veniam dolor est ratione facere,
                consequatur magni deleniti distinctio laboriosam eius placeat
                adipisci enim tempore ea hic. Cumque culpa odit in a numquam,
                sit laborum unde facilis earum obcaecati fugiat dicta eos
                consectetur? Officiis temporibus quae incidunt possimus suscipit
                deleniti corporis corrupti esse. Quibusdam eius explicabo
                asperiores nulla debitis qui quidem et consectetur fuga a, velit
                in repellat nisi reiciendis, eligendi cumque ipsum officia
                fugit. Praesentium ipsam aperiam porro necessitatibus neque
                provident reprehenderit recusandae, alias cumque velit labore
                soluta exercitationem mollitia vel molestiae dolore! Ipsam eos
                debitis eum tempore reprehenderit sit autem veniam, aut tenetur
                nulla neque ipsum animi ab quis sed optio. Architecto earum esse
                magni dolores, at autem repellat aliquid accusamus et enim
                aperiam deserunt fuga deleniti sequi aut ea impedit expedita
                placeat reprehenderit! Commodi, veniam deserunt vero quidem
                facere, pariatur nisi minus reprehenderit necessitatibus iure
                cum, voluptatum explicabo? Omnis blanditiis sint facere
                inventore voluptatum pariatur, officiis esse debitis obcaecati!
                Consequatur atque minus doloremque quae veritatis error tempora
                deserunt tempore porro ducimus, odit inventore officia ipsa,
                iure alias impedit dolores expedita nihil iste asperiores rerum,
                nesciunt debitis. Officia dolorem quidem adipisci deserunt hic.
                Repellendus omnis harum ipsum debitis error excepturi, incidunt
                reprehenderit! Illo, eos assumenda molestiae soluta repellendus
                porro distinctio sequi, excepturi neque aliquid ipsa a
                consequuntur labore. Dignissimos quibusdam sunt temporibus quas
                deleniti repellat ipsa vel nemo nobis, officiis corporis quia,
                perspiciatis earum? Quisquam, tempore sunt, libero quia
                voluptatibus illum officiis culpa laudantium laboriosam omnis
                sed reprehenderit, ullam dicta possimus eum perferendis
                excepturi? Quam, officiis. Quae, enim. Reprehenderit
                voluptatibus eveniet, earum atque ex provident pariatur dolores,
                fugit distinctio error alias, assumenda rerum quibusdam! Facere
                adipisci explicabo magni? Optio pariatur blanditiis, itaque
                quaerat vel fugit sunt saepe magnam temporibus repellat iure
                minima illo veniam repudiandae facilis sit necessitatibus ab
                atque voluptatibus doloribus! Recusandae beatae quo laboriosam
                repellat! Animi harum alias, totam nobis delectus vitae
                voluptatem maiores dolores molestias optio nesciunt iusto?
                Maxime tempora voluptate molestias dolor quia delectus
                voluptatem? Aliquam iste reiciendis, earum assumenda autem eum
                sit corporis praesentium necessitatibus! Voluptas provident
                atque ullam cum molestiae quidem explicabo magni velit, vitae
                delectus iusto quia voluptatibus fuga consequatur ipsam non enim
                officiis. Consequatur numquam quasi provident nihil eos iste,
                corrupti magnam nesciunt tempora libero? At sunt blanditiis
                nulla saepe illum facere similique nihil, nam laudantium sint
                quas ad, quisquam, assumenda ipsam impedit doloribus laborum!
                Temporibus, impedit fuga. Laboriosam voluptatem unde modi nemo,
                vel sed eum! Rem placeat expedita eum possimus nisi vitae
                maiores at ipsum, quas doloremque. Aliquid quas cupiditate
                aperiam voluptatum accusamus vitae dolorem. Repudiandae cumque
                optio voluptate sapiente enim eos id obcaecati blanditiis
                laboriosam fuga cupiditate ex maxime officia, possimus ipsa
                fugiat atque recusandae impedit? Expedita nostrum, ex
                consequuntur alias, nisi unde dolores tenetur accusantium magni
                ab porro quas non perspiciatis debitis, quae suscipit quo nulla
                veritatis placeat. A, vitae saepe mollitia commodi accusamus
                necessitatibus cupiditate sunt odit repudiandae assumenda
                minima, dolorum eveniet itaque esse fugit ipsum obcaecati
                quaerat ratione delectus repellendus maiores temporibus! Harum
                facere voluptate obcaecati mollitia qui molestiae! Sit quas
                magni itaque consequatur aperiam, minus impedit qui expedita
                voluptas explicabo asperiores libero veniam saepe molestiae
                ratione fugit necessitatibus accusantium dolore culpa ipsum,
                quos autem. Tempora vel doloribus animi fuga quos ab eos magnam,
                distinctio aliquid! Eius doloribus in nobis natus ullam eaque
                necessitatibus, sint quaerat aut commodi deleniti saepe ab
                pariatur tempora tenetur accusamus perspiciatis maiores earum et
                ratione repellat voluptatum odit. Rem amet eum illo iure cumque
                ab, debitis alias omnis!
              </p>
            </ScrollShadow>
          </div>
        </main>
      </div>
    </div>
  );
}
