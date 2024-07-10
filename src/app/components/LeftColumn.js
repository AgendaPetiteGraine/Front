import Image from "next/image";
import Filters from "./left-column/Filters";
import MyCalendar from "./left-column/Calendar";
import Host from "./left-column/Host";
import Event from "./left-column/Event";
const LeftColumn = ({
  filter,
  setFilter,
  keyWords,
  cities,
  types,
  events,
  page,
  data,
  setToken,
  token,
}) => {
  return (
    <div className="left-col">
      <div>
        <Image
          src="/logo.png" // Le chemin vers l'image dans le dossier public
          alt="Logo" // Texte alternatif pour l'accessibilité
          width={258} // Largeur de l'image
          height={195} // Hauteur de l'image
        />
      </div>
      {page === "events" && (
        <div>
          <Filters
            filter={filter}
            setFilter={setFilter}
            keyWords={keyWords}
            cities={cities}
            types={types}
          />
          <div className="calendar">
            <MyCalendar filter={filter} setFilter={setFilter} events={events} />
          </div>
        </div>
      )}
      {page === "home" && token && data && (
        <div>
          <Host data={data} setToken={setToken} />
        </div>
      )}
      {page === "event" && data && (
        <div>
          <Event data={data} />
        </div>
      )}
      <style jsx>{`
        .left-col {
          display: flex;
          flex-direction: column;
          height: 100vh;
          gap: 0px;
          background: #294260;
          margin-bottom: 10px;
        }
        .calendar {
          background: #fff;
          width: 100%;
          margin: auto;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default LeftColumn;
