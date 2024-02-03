import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const getPhotoById = async (photoId: string) => {
  const photos = [
    {
      id: "1",
      photo: "https://c.pxhere.com/photos/9a/91/photo-83038.jpg!d",
    },
    {
      id: "2",
      photo:
        "https://static.life.ru/posts/2019/01/1186666/348d73b25b45939fa78a5820dc7535d1.jpg",
    },
    {
      id: "3",
      photo: "https://sub-cult.ru/images/WiyIW3c_tgI_1.jpg",
    },
  ];
  const selectedPhoto = photos.find((photo) => photo.id === photoId);

  return selectedPhoto?.photo;
};

const PhotoDetailPage: React.FC = () => {
  const router = useRouter();
  const { eventId, photoId } = router.query;
  const [photo, setPhoto] = useState<any>(null);
  const events = [
    {
      id: "1",
      title: 'Концерт "Рок ночь"',
      date: "2024-02-10",
      location: 'Стадион "РокАрена"',
      description: "Это будет великолепный концерт рок-музыки!",
    },
    {
      id: "2",
      title: "Выставка современного искусства",
      date: "2024-02-15",
      location: 'Галерея "ArtSpace"',
      description:
        "Приходите на нашу выставку и наслаждайтесь произведениями современных художников!",
    },
    {
      id: "3",
      title: "Презентация новой книги",
      date: "2024-02-20",
      location: 'Книжный магазин "Прочитай меня"',
      description:
        "Приглашаем вас на презентацию новой книги известного автора!",
    },
  ];
  const selectedEvent = events.find((event) => event.id === eventId);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const photoData = await getPhotoById(photoId as string);
        setPhoto(photoData);
      } catch (error) {
        console.error("Ошибка загрузки фотографии:", error);
      }
    };

    if (eventId && photoId) {
      fetchPhoto();
    }
  }, [eventId, photoId]);

  if (!eventId || !photoId) {
    return <div>Загрузка...</div>;
  }
  if (!selectedEvent) {
    return <div>Событие не найдено</div>;
  }
  return (
    <div>
      <h1>Детали события: {selectedEvent.title}</h1>
      <p>Дата: {selectedEvent.date}</p>
      <p>Местоположение: {selectedEvent.location}</p>
      <p>Описание: {selectedEvent.description}</p>
      <h1>
        Фотография события {eventId}, ID фото: {photoId}
      </h1>
      {photo ? (
        <Image
          src={photo}
          width={500}
          height={500}
          alt="Picture of the author"
          unoptimized
        />
      ) : (
        <div>Фотография не найдена</div>
      )}
    </div>
  );
};

export default PhotoDetailPage;
