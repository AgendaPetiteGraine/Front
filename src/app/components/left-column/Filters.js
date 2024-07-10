import Image from "next/image";
import AutoSuggest from "../../components/AutoSuggest";
import { useState, useEffect, useRef } from "react";

const Filters = ({ filter, setFilter, keyWords, cities, types }) => {
  const [ageMin, setAgeMin] = useState(4);
  const [isFree, setIsFree] = useState(false);
  const [displayPlace, setDisplayPlace] = useState(false);
  const [displayType, setDisplayType] = useState(false);
  const [displayAge, setDisplayAge] = useState(false);
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  const imageRef3 = useRef(null);
  const imageRef4 = useRef(null);
  const imageRef5 = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (imageRef1.current && imageRef1.current.contains(event.target)) {
        return;
      }
      if (imageRef2.current && imageRef2.current.contains(event.target)) {
        return;
      }
      if (imageRef3.current && imageRef3.current.contains(event.target)) {
        return;
      }
      if (imageRef4.current && imageRef4.current.contains(event.target)) {
        return;
      }
      if (imageRef5.current && imageRef5.current.contains(event.target)) {
        return;
      }
      setDisplayPlace(false);
      setDisplayType(false);
      setDisplayAge(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const changeFilter = (type, element) => {
    if (filter) {
      const newFilter = { ...filter };
      if (type === "city") {
        const index = newFilter.city.indexOf(element);
        if (index > -1) {
          newFilter.city.splice(index, 1);
        } else {
          newFilter.city.push(element);
        }
      }
      if (type === "type") {
        const index = newFilter.type.indexOf(element);
        if (index > -1) {
          newFilter.type.splice(index, 1);
        } else {
          newFilter.type.push(element);
        }
      }
      if (type === "keyWords") {
        newFilter.keyWords = element;
      }
      if (type === "free") {
        newFilter.free = !isFree;
        setIsFree(!isFree);
      }
      if (type === "ageMin") {
        newFilter.ageMin = parseInt(element);
      }
      if (type === "ageMax") {
        newFilter.ageMax = parseInt(element);
      }
      if (type === "areBabyAccepted") {
        newFilter.areBabyAccepted = true;
      }
      setFilter(newFilter);
    }
  };
  return (
    <div className="filters">
      {/* <h3>Filtrer les événements : </h3> */}
      {/* gratuits */}
      <div>
        <label>
          Gratuits uniquement{" "}
          <input
            type="checkbox"
            value={isFree}
            onChange={() => {
              changeFilter("free", isFree);
            }}
          />
        </label>
      </div>
      {/* par lieu */}
      <div>
        <div className="filter-name">
          <h4>Par lieu</h4>{" "}
          <Image
            src="/sort.png"
            alt="dérouler"
            width={15}
            height={15}
            onClick={() => {
              setDisplayPlace(!displayPlace);
              setDisplayType(false);
              setDisplayAge(false);
            }}
            ref={imageRef1}
          />
        </div>
        {displayPlace && (
          <div className="list" ref={imageRef4}>
            {cities.map((city, index) => (
              <label key={index}>
                {city}
                <input
                  type="checkbox"
                  value={city}
                  checked={(filter && filter.city.includes(city)) ?? false}
                  onChange={(event) => {
                    changeFilter("city", city);
                  }}
                />
              </label>
            ))}
          </div>
        )}
      </div>
      {/* par type */}
      <div>
        <div className="filter-name">
          <h4>Par type</h4>{" "}
          <Image
            src="/sort.png"
            alt="dérouler"
            width={15}
            height={15}
            onClick={() => {
              setDisplayType(!displayType);
              setDisplayPlace(false);
              setDisplayAge(false);
            }}
            ref={imageRef2}
          />
        </div>
        {displayType && (
          <div className="list" ref={imageRef5}>
            {types.map((type, index) => (
              <label key={index}>
                {type}
                <input
                  type="checkbox"
                  value={type}
                  checked={(filter && filter.type.includes(type)) ?? false}
                  onChange={() => {
                    changeFilter("type", type);
                  }}
                />
              </label>
            ))}
          </div>
        )}
      </div>
      {/* par âge */}
      <div>
        <div className="filter-name">
          <h4>Par Âge</h4>{" "}
          <Image
            src="/sort.png"
            alt="dérouler"
            width={15}
            height={15}
            onClick={() => {
              setDisplayAge(!displayAge);
              setDisplayPlace(false);
              setDisplayType(false);
            }}
            ref={imageRef3}
          />
        </div>
        {displayAge && (
          <div>
            <input
              className="range"
              type="range"
              min="0"
              max="4"
              value={ageMin}
              step="1"
              onChange={(event) => {
                setAgeMin(event.target.value);
                changeFilter("ageMin", event.target.value);
              }}
            />
            {filter.ageMin === 0
              ? "Dès la naissance"
              : `À partir de ${filter.ageMin} ans`}
          </div>
        )}
      </div>
      {/* par mot-clé */}
      <div>
        <h4>Par mot-clé : </h4>
        <AutoSuggest
          suggestionsTab={keyWords}
          xs
          setFilter={setFilter}
          filter={filter}
        />
      </div>
      <h4>Par date : </h4>

      <style jsx>{`
        .filters {
          display: flex;
          padding-left: 20px;
          padding-right: 20px;
          flex-direction: column;
          gap: 20px;
          color: #ffffff;
        }
        .filter-name {
          display: flex;
          gap: 10px;
        }
        .list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .range {
          width: 80px;
        }
      `}</style>
    </div>
  );
};

export default Filters;
