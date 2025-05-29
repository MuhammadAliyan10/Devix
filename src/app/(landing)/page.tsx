import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-border px-10 py-3">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-primary text-lg font-bold leading-tight tracking-[-0.015em]">
              Devix
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a
                className="text-primary text-sm font-medium leading-normal"
                href="#"
              >
                Home
              </a>
              <a
                className="text-primary text-sm font-medium leading-normal"
                href="#"
              >
                Features
              </a>
              <a
                className="text-primary text-sm font-medium leading-normal"
                href="#"
              >
                Pricing
              </a>
              <a
                className="text-primary text-sm font-medium leading-normal"
                href="#"
              >
                Contact
              </a>
            </div>
            <Button
              variant={"outline"}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4  text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <Link href="/login" className="truncate">
                Get Started
              </Link>
            </Button>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4">
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Unlock Your Future with Devix
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Navigate your academic journey and discover your ideal
                      career path with our comprehensive resources and
                      personalized guidance.
                    </h2>
                  </div>
                  <div className="flex-wrap gap-3 flex justify-center">
                    <Button
                      variant={"secondary"}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5  text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    >
                      <span className="truncate">Get Started</span>
                    </Button>
                    <Button
                      variant={"outline"}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5  text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    >
                      <span className="truncate">View Plans</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Features
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-border bg-background p-4 flex-col">
                <div
                  className="text-primary"
                  data-icon="GraduationCap"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-primary text-base font-bold leading-tight">
                    Career Path Suggestions
                  </h2>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">
                    Receive tailored career recommendations based on your
                    academic performance and interests.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-border bg-background p-4 flex-col">
                <div
                  className="text-primary"
                  data-icon="ChartLine"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-primary text-base font-bold leading-tight">
                    Progress Tracking
                  </h2>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">
                    Monitor your academic progress and stay on track with
                    personalized milestones and insights.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-border bg-background p-4 flex-col">
                <div
                  className="text-primary"
                  data-icon="BookOpen"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h64a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-primary text-base font-bold leading-tight">
                    Resource Library
                  </h2>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">
                    Access a vast library of up-to-date resources, including
                    articles, videos, and expert advice.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-border bg-background p-4 flex-col">
                <div
                  className="text-primary"
                  data-icon="UsersThree"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-primary text-base font-bold leading-tight">
                    Community Support
                  </h2>
                  <p className="text-muted-foreground text-sm font-normal leading-normal">
                    Connect with peers, mentors, and industry professionals for
                    guidance and support.
                  </p>
                </div>
              </div>
            </div>
            <h2 className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Pricing
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3 @3xl:grid-cols-4">
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-border bg-background p-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-primary text-base font-bold leading-tight">
                    Free
                  </h1>
                  <p className="flex items-baseline gap-1 text-primary">
                    <span className="text-primary text-4xl font-black leading-tight tracking-[-0.033em]">
                      $0
                    </span>
                    <span className="text-primary text-base font-bold leading-tight">
                      /month
                    </span>
                  </p>
                </div>
                <Button
                  variant={"outline"}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Get Started</span>
                </Button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Limited career suggestions
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Basic progress tracking
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Access to free resources
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-border bg-background p-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h1 className="text-primary text-base font-bold leading-tight">
                      Basic
                    </h1>
                    <p className="text-white text-xs font-medium leading-normal tracking-[0.015em] rounded-xl bg-[#0c7ff2] px-3 py-[3px] text-center">
                      Most Popular
                    </p>
                  </div>
                  <p className="flex items-baseline gap-1 text-primary">
                    <span className="text-primary text-4xl font-black leading-tight tracking-[-0.033em]">
                      $9.99
                    </span>
                    <span className="text-muted-foreground text-base font-bold leading-tight">
                      /month
                    </span>
                  </p>
                </div>
                <Button
                  variant={"secondary"}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Subscribe</span>
                </Button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Unlimited career suggestions
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Advanced progress tracking
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Access to all resources
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Priority support
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-border bg-background p-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h1 className="text-primary text-base font-bold leading-tight">
                      Premium
                    </h1>
                    <p className="text-white text-xs font-medium leading-normal tracking-[0.015em] rounded-xl bg-[#0c7ff2] px-3 py-[3px] text-center">
                      Best Value
                    </p>
                  </div>
                  <p className="flex items-baseline gap-1 text-primary">
                    <span className="text-primary text-4xl font-black leading-tight tracking-[-0.033em]">
                      $19.99
                    </span>
                    <span className="text-muted-foreground text-base font-bold leading-tight">
                      /month
                    </span>
                  </p>
                </div>
                <Button
                  variant={"outline"}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4  text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Subscribe</span>
                </Button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    All features in Basic
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Personalized mentorship
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Exclusive community events
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-muted-foreground">
                    <div
                      className="text-primary"
                      data-icon="Check"
                      data-size="20px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Premium resource access
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Testimonials
            </h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-8">
                <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-52 pt-4">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"></div>
                  <div>
                    <p className="text-primary text-base font-medium leading-normal">
                      Sarah M.
                    </p>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">
                      Devix helped me discover my passion for environmental
                      science and provided the resources I needed to succeed.
                    </p>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-52 pt-4">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"></div>
                  <div>
                    <p className="text-primary text-base font-medium leading-normal">
                      David L.
                    </p>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">
                      The progress tracking feature kept me motivated and on
                      track throughout my college journey.
                    </p>
                  </div>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-52 pt-4">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"></div>
                  <div>
                    <p className="text-primary text-base font-medium leading-normal">
                      Emily R.
                    </p>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">
                      The community support and mentorship I received through
                      Devix were invaluable in my career exploration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a
                  className="text-muted-foreground text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  About
                </a>
                <a
                  className="text-muted-foreground text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  Privacy Policy
                </a>
                <a
                  className="text-muted-foreground text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  Terms
                </a>
                <a
                  className="text-muted-foreground text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  Contact
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#">
                  <div
                    className="text-muted-foreground"
                    data-icon="TwitterLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div
                    className="text-muted-foreground"
                    data-icon="FacebookLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div
                    className="text-muted-foreground"
                    data-icon="InstagramLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                    </svg>
                  </div>
                </a>
              </div>
              <p className="text-muted-foreground text-base font-normal leading-normal">
                © 2024 Devix. All rights reserved.
              </p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
}
