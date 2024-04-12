import { Link } from "./HoverImageLinks";

export const Github = () => {
  const URL =
    "https://avatars.githubusercontent.com/u/120157746?s=400&u=53fc1f25767b05807412bfb9730e437358134445&v=4";

  return (
    <div className="mt-4 p-10 flex w-full">
      <div className="flex justify-center items-center">
        <img
          className="rounded-full"
          width={300}
          height={300}
          alt="github"
          src={URL}
        />
      </div>
      <section className="bg-neutral-950 p-4 md:p-8 ml-[150px] rounded-xl">
        <div className="mx-auto max-w-5xl">
          <Link
            heading="Web-Compiler"
            subheading="Online compiler for html css and js"
            imgSrc="/web_compiler.png"
            href="https://web-compiler-nu.vercel.app/"
          />
          <Link
            heading="CodeTypo"
            subheading="An Online Code Typing Website"
            imgSrc="/code_typo.png"
            href="https://codetypo.vercel.app/"
          />
          <Link
            heading="CodeTypo"
            subheading="An Online Code Typing Website"
            imgSrc="/code_typo.png"
            href="https://codetypo.vercel.app/"
          />
        </div>
      </section>
    </div>
  );
};
