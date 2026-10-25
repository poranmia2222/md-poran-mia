"use client";

import { useEffect, useRef } from "react";

const RESUME_URL = "/resume.pdf";

// Tech stack — official brand marks (Simple Icons) + brand colors
const TECH_STACK = [
  {
    label: "Next.js",
    color: "#FFFFFF",
    path: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z",
  },
  {
    label: "TypeScript",
    color: "#3178C6",
    path: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z",
  },
  {
    label: "React",
    color: "#61DAFB",
    path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
  },
  {
    label: "Tailwind CSS",
    color: "#38BDF8",
    path: "M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z",
  },
  {
    label: "Firebase",
    color: "#FFCA28",
    path: "M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z",
  },
  {
    label: "Node.js",
    color: "#5FA04E",
    path: "M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z",
  },
  {
    label: "Express",
    color: "#D4D4D8",
    path: "M12.262 16.666h1.146l6.975-9.325H19.22zm9.778 1.441v.004l-4.334-5.706-.557.74 4.873 6.682H.945V4.173h9.505l5.026 6.7.574-.772-4.374-5.928h.003l-.719-.945H0v17.544h24zM10.917 8.705a3.8 3.8 0 0 0-1.292-1.183q-.796-.45-1.916-.45c-.746 0-1.37.14-1.906.424a3.76 3.76 0 0 0-1.31 1.12 4.9 4.9 0 0 0-.75 1.581 7.17 7.17 0 0 0 0 3.696c.148.567.402 1.101.75 1.573a3.5 3.5 0 0 0 1.31 1.066q.803.39 1.906.389 1.77 0 2.739-.868.966-.867 1.328-2.457h-1.139q-.271 1.084-.977 1.734-.704.651-1.952.65-.812 0-1.392-.342a3.1 3.1 0 0 1-.957-.869 3.5 3.5 0 0 1-.551-1.182 5 5 0 0 1-.17-1.133 9 9 0 0 0-.015-.286 4.5 4.5 0 0 1 .015-.829c.047-.418.147-.83.296-1.223A3.7 3.7 0 0 1 5.54 9.05a2.9 2.9 0 0 1 .922-.742q.541-.28 1.246-.28c.47 0 .869.093 1.23.28q.541.281.922.742.379.461.587 1.057t.225 1.246H5.625l.004.957h6.182a7.3 7.3 0 0 0-.18-1.924 4.9 4.9 0 0 0-.715-1.68z",
  },
  {
    label: "MongoDB",
    color: "#47A248",
    path: "M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z",
  },
  {
    label: "Better Auth",
    color: "#A78BFA",
    path: "M0 3.39v17.22h5.783V15.06h6.434V8.939H5.783V3.39ZM12.217 8.94h5.638v6.122h-5.638v5.548H24V3.391H12.217Z",
  },
] as const;

const SOCIALS = [
  {
    label: "GitHub",
    href: "#",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "Email",
    href: "#contact",
    path: "M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67ZM22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z",
  },
] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax: layers with [data-speed] translate with scroll + cursor;
  // the content wrapper ([data-fade]) fades out as you scroll past the hero.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(
      section.querySelectorAll<HTMLElement>("[data-speed]"),
    );
    const faders = Array.from(
      section.querySelectorAll<HTMLElement>("[data-fade]"),
    );

    const mouse = { x: 0, y: 0 };
    let raf = 0;

    const render = () => {
      raf = 0;
      const scrollY = window.scrollY;

      for (const el of layers) {
        const speed = Number.parseFloat(el.dataset.speed ?? "0");
        const x = mouse.x * speed * 44;
        const y = scrollY * speed + mouse.y * speed * 32;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      const progress = Math.min(scrollY / 600, 1);
      for (const el of faders) {
        el.style.opacity = String(1 - progress);
        el.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
      schedule();
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("mousemove", onMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-4"
    >
      {/* Layer 1: dot grid background (slowest) */}
      <div
        aria-hidden
        data-speed="-0.06"
        className="absolute -inset-16 will-change-transform"
      >
        <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(163,230,53,0.07)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Layer 2: glowing lime blobs */}
      <div
        aria-hidden
        data-speed="-0.12"
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute top-1/4 left-[12%] size-80 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-1/4 size-96 rounded-full bg-lime-400/[0.07] blur-3xl" />
      </div>

      {/* Layer 3: dual diagonal marquees — two "road lanes" of outline
          text crossing behind the content, streaming opposite ways */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Lane 1 — flows to the right (upper lane, stronger stroke) */}
        <div className="absolute left-1/2 top-[33%] w-[140vw] -translate-x-1/2 -rotate-2">
          <div className="animate-marquee-r flex w-max">
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0">
                {Array.from({ length: 4 }).map((_, k) => (
                  <span
                    key={k}
                    className="pr-10 text-[13vw] font-black tracking-tight whitespace-nowrap text-transparent uppercase select-none [-webkit-text-stroke:1.5px_rgba(163,230,53,0.14)]"
                  >
                    Full Stack Developer
                    <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(163,230,53,0.3)]">
                      {" "}
                      ✦{" "}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Lane 2 — flows to the left (lower lane, fainter stroke) */}
        <div className="absolute left-1/2 top-[52%] w-[140vw] -translate-x-1/2 rotate-2">
          <div className="animate-marquee-l flex w-max">
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0">
                {Array.from({ length: 4 }).map((_, k) => (
                  <span
                    key={k}
                    className="pr-10 text-[13vw] font-black tracking-tight whitespace-nowrap text-transparent uppercase select-none [-webkit-text-stroke:1.5px_rgba(163,230,53,0.08)]"
                  >
                    Full Stack Developer
                    <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(163,230,53,0.24)]">
                      {" "}
                      ✦{" "}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foreground: fades + sinks as you scroll.
          Two-column layout keeps the recruiter scan path (badge → role →
          pitch → resume/contact) fully above the fold; the portrait + orbit
          stack is secondary, on the right. */}
      <div
        data-fade
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-10 will-change-transform lg:grid-cols-[1.05fr_auto] lg:gap-16"
      >
        {/* Left column: everything a recruiter needs, immediately visible */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-lime-300 sm:text-sm">
            {/* Pulsing "open to work" dot — the first thing recruiters scan for */}
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime-400" />
            </span>
            Open to work — Full-time & freelance
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl xl:text-6xl">
            Hi, I&apos;m <span className="text-lime-400">Poran Mia</span>
            <span className="mt-2 block text-2xl font-bold text-zinc-200 sm:text-3xl xl:text-4xl">
              Full-Stack Developer · Next.js · React · Node.js
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
            I build fast, production-ready web apps end to end — pixel-perfect
            UIs, robust REST APIs, and databases that scale.
          </p>

          {/* CTAs — resume download is primary: a recruiter's #1 action */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href={RESUME_URL}
              download="Poran_Mia_Resume.pdf"
              className="group inline-flex items-center gap-2 rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-semibold text-[#0a0d0a] transition-all duration-200 hover:bg-lime-300 hover:shadow-[0_0_25px_rgba(163,230,53,0.35)]"
            >
              Download Resume
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors duration-200 hover:border-lime-400/50 hover:text-lime-400"
            >
              View My Work
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-zinc-400 transition-colors duration-200 hover:text-lime-400"
            >
              Get in Touch
              <span aria-hidden>↗</span>
            </a>
          </div>

          {/* Socials */}
          <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
            {SOCIALS.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-10 place-items-center rounded-lg border border-zinc-800 text-zinc-400 transition-all duration-200 hover:border-lime-400/50 hover:text-lime-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="size-5"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Right column: compact portrait */}
        <div className="relative justify-self-center">
          {/* Glow behind portrait (its own parallax layer) */}
          <div
            aria-hidden
            data-speed="0.14"
            className="absolute -inset-8 will-change-transform"
          >
            <div className="animate-aura absolute inset-0 rounded-full bg-lime-400/25 blur-3xl" />
          </div>

          {/* Portrait card — float bob wrapper */}
          <div data-speed="0.08" className="relative will-change-transform">
            <div className="animate-float" style={{ animationDelay: "1.4s" }}>
              <div className="relative aspect-[4/5] w-56 rotate-3 overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-lime-400/10 ring-1 ring-lime-400/25 sm:w-64 lg:w-72 lg:rotate-2">
                {/* Plain <img>: serves the raw high-res PNG, no optimizer recompression */}
                <img
                  src="/MyImage.png"
                  alt="Portrait of Poran Mia"
                  width={1448}
                  height={1086}
                  loading="eager"
                  decoding="async"
                  className="animate-breathe absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Skills ticker — marquee strip pinned to the hero's bottom edge */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-y border-zinc-800/80 bg-[#0a0d0a]/70 py-3 backdrop-blur">
        <div className="animate-marquee-l flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
              {/* 3 copies per half keep the half wider than any viewport —
                  the -50% translate then loops with no blank gap */}
              {Array.from({ length: 3 }).map((_, copy) =>
                TECH_STACK.map(({ label, color, path }) => (
                  <span
                    key={`${copy}-${label}`}
                    className="mx-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill={color}
                      aria-hidden
                      className="size-4"
                    >
                      <path d={path} />
                    </svg>
                    {label}
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
        {/* Soft edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0d0a] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0d0a] to-transparent"
        />
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        data-fade
        className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex h-9 w-5.5 items-start justify-center rounded-full border border-zinc-600 p-1.5">
          <span className="animate-float size-1 rounded-full bg-lime-400" />
        </span>
      </div>
    </section>
  );
}
