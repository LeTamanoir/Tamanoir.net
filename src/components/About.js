export default function About() {
  return (
    <main className="flex w-[50rem] items-center mt-40">
      <img src="/images/profile.jpg" className="w-1/4" />

      <div className="w-3/4 text-white pl-8 text-base leading-7">
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
