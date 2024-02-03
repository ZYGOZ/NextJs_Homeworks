import React, { useEffect } from "react";
import { useRouter } from "next/router";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    //c not-found.tsx у меня не работает так что назвал 404
    <div>
      <h1>Страница не найдена</h1>
      <p>
        Вы будете перенаправлены на главную страницу через несколько секунд...
      </p>
    </div>
  );
};

export default NotFoundPage;
