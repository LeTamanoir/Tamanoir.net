export default function About() {
  return (
    <main className="flex flex-col sm:flex-row w-[90vw] sm:w-[40rem] lg:w-[50rem] justify-center items-center mt-5 sm:mt-40">
      <img
        src="/images/profile.jpg"
        className="w-64 sm:w-60 lg:w-1/4 mb-5 sm:mb-0"
      />

      <div className="w-full px-5 text-white sm:pl-8 text-base leading-7">
        My name is <b className="text-lg">Martin Saldinger</b>. I love{" "}
        <b className="text-lg">computer science</b>, precisely{" "}
        <b className="text-lg">web development</b>{" "}
        <b className="text-lg">and pentesting</b>. <br />
        In my free-time I like to code and practice my hacking skills by solving
        CTFs. <br />
        I'm currently studying at <b className="text-lg">Epitech Paris</b> in
        the International Track program.
      </div>
    </main>
  );
}
