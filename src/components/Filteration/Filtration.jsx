import { useState } from "react";
import useWidth from "../GetWidthHook/useWidth";
import "./Filtration.css";
import PropTypes from "prop-types";
import { Button, Offcanvas } from "react-bootstrap";
import { IoFilterSharp } from "react-icons/io5";
export default function Filtration({
  data,
  setPriceRange,
  setSpecifications,
  priceRange,
  specifications,
}) {
  // data = data.products;
  function filterRange() {
    let priceRange = [];
    data.forEach((item) => {
      priceRange.push(item.price.new);
    });
    priceRange.sort((a, b) => a - b);
    const minPrice = Math.floor(priceRange[0]);
    const maxPrice = Math.ceil(priceRange[priceRange.length - 1]);
    const priceSteps = Math.floor((maxPrice - minPrice) / 5);
    let FiltrationRange = [minPrice];
    for (let i = 1; i < 5; i++) {
      FiltrationRange.push(Math.ceil(FiltrationRange[i - 1] + priceSteps));
    }
    return FiltrationRange;
  }
  function priceFilter(...nums) {
    nums.length == 2
      ? setPriceRange(`${nums[0]},${nums[1]}`)
      : nums.length == 1
      ? setPriceRange(`price>=${nums[0]}`)
      : "";
  }
  function handleSearchBySpics(name, value) {
    const numRegex = /^[0-9]$/;
    let searchValue = [];
    if (numRegex.test(value[0])) {
      value = value.split("");
      for (let i = 0; i < value.length; i++) {
        if (numRegex.test(value[i])) {
          searchValue.push(value[i]);
        }
      }
      searchValue = searchValue.join("");
    } else {
      searchValue = value;
      console.log(searchValue);
    }
    console.log(searchValue);
    setSpecifications(`${name}==${searchValue}`);
  }
  const screenWidth = useWidth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {screenWidth > 700 ? (
        <div id="Filtration">
          <span className="d-flex justify-content-between">
            <h3>Filtration</h3>{" "}
            {(priceRange || specifications) && (
              <button
                className="btn btn-dark"
                onClick={() => {
                  setPriceRange("");
                  setSpecifications("");
                }}
              >
                Reset
              </button>
            )}
          </span>
          <section>
            <h4>Price</h4>
            <ul>
              <li
                onClick={() => {
                  priceFilter(filterRange()[0], filterRange()[1]);
                }}
              >{`${filterRange()[0]} to ${filterRange()[1]}`}</li>
              <li
                onClick={() => {
                  priceFilter(filterRange()[1], filterRange()[2]);
                }}
              >{`${filterRange()[1]} to ${filterRange()[2]}`}</li>
              <li
                onClick={() => {
                  priceFilter(filterRange()[2], filterRange()[3]);
                }}
              >{`${filterRange()[2]} to ${filterRange()[3]}`}</li>
              <li
                onClick={() => {
                  priceFilter(filterRange()[3], filterRange()[4]);
                }}
              >{`${filterRange()[3]} to ${filterRange()[4]}`}</li>
              <li
                onClick={() => {
                  priceFilter(filterRange()[4]);
                }}
              >{`${filterRange()[4]}  and above`}</li>
            </ul>
          </section>
          {data.length > 0 ? (
            data[0].subCategory.name == "Laptops" ? (
              <>
                <section>
                  <h4>Display Screen</h4>
                  <ul>
                    <li
                      onClick={() => {
                        handleSearchBySpics("Display", "14");
                      }}
                    >
                      14
                    </li>
                    <li
                      onClick={() => {
                        handleSearchBySpics("Display", "15");
                      }}
                    >
                      15
                    </li>
                    <li
                      onClick={() => {
                        handleSearchBySpics("Display", "16");
                      }}
                    >
                      16
                    </li>
                    <li
                      onClick={() => {
                        handleSearchBySpics("Display", "Liquid Retina");
                      }}
                    >
                      Liquid Retina
                    </li>
                  </ul>
                </section>
                <section>
                  <h4>Ram</h4>
                  <ul>
                    {["8 Gb", "16 Gb", "24 Gb"].map((item) => {
                      return (
                        <li
                          key={item}
                          onClick={() => {
                            handleSearchBySpics("RAM", item);
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </section>
                <section>
                  <h4>cpu</h4>
                  <ul>
                    {["i3", "i5", "i7", "m2", "Ryzen"].map((item) => {
                      return (
                        <li
                          key={item}
                          onClick={() => {
                            handleSearchBySpics("Processor Type", item);
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </>
            ) : data[0].subCategory.name == "Mobiles" ? (
              <>
                <section>
                  <h4>Display Type</h4>
                  <ul>
                    {["AMOLED", "Super Amoled", "Retina"].map((item) => {
                      return (
                        <li
                          key={item}
                          onClick={() => {
                            handleSearchBySpics("DisplayType", item);
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </section>
                <section>
                  <h4>Mobile Ram Size</h4>
                  <ul>
                    {["4 Gb", "6 Gb", "8 Gb", "16 Gb"].map((item) => {
                      return (
                        <li
                          key={item}
                          onClick={() => {
                            handleSearchBySpics("RAMSize", item);
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </section>
                <section>
                  <h4>Mobile Internal Memory</h4>
                  <ul>
                    {["32 Gb", "64 Gb", "128 Gb", "256 Gb"].map((item) => {
                      return (
                        <li
                          key={item}
                          onClick={() => {
                            handleSearchBySpics("InternalMemory", item);
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </>
            ) : (
              "there is no data here"
            )
          ) : (
            <div>there is no data here</div>
          )}
        </div>
      ) : (
        <>
          <Button variant="primary" onClick={handleShow} className="filterBtn">
            <IoFilterSharp />
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div id="Filtration">
                <span className="d-flex justify-content-between">
                  <h3>Filtration</h3>{" "}
                  {(priceRange || specifications) && (
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        setPriceRange("");
                        setSpecifications("");
                      }}
                    >
                      Reset
                    </button>
                  )}
                </span>
                <section>
                  <h4>Price</h4>
                  <ul>
                    <li
                      onClick={() => {
                        priceFilter(filterRange()[0], filterRange()[1]);
                      }}
                    >{`${filterRange()[0]} to ${filterRange()[1]}`}</li>
                    <li
                      onClick={() => {
                        priceFilter(filterRange()[1], filterRange()[2]);
                      }}
                    >{`${filterRange()[1]} to ${filterRange()[2]}`}</li>
                    <li
                      onClick={() => {
                        priceFilter(filterRange()[2], filterRange()[3]);
                      }}
                    >{`${filterRange()[2]} to ${filterRange()[3]}`}</li>
                    <li
                      onClick={() => {
                        priceFilter(filterRange()[3], filterRange()[4]);
                      }}
                    >{`${filterRange()[3]} to ${filterRange()[4]}`}</li>
                    <li
                      onClick={() => {
                        priceFilter(filterRange()[4]);
                      }}
                    >{`${filterRange()[4]}  and above`}</li>
                  </ul>
                </section>
                {data.length > 0 ? (
                  data[0].subCategory.name == "Laptops" ? (
                    <>
                      <section>
                        <h4>Display Screen</h4>
                        <ul>
                          <li
                            onClick={() => {
                              handleSearchBySpics("Display", "14");
                            }}
                          >
                            14
                          </li>
                          <li
                            onClick={() => {
                              handleSearchBySpics("Display", "15");
                            }}
                          >
                            15
                          </li>
                          <li
                            onClick={() => {
                              handleSearchBySpics("Display", "16");
                            }}
                          >
                            16
                          </li>
                          <li
                            onClick={() => {
                              handleSearchBySpics("Display", "Liquid Retina");
                            }}
                          >
                            Liquid Retina
                          </li>
                        </ul>
                      </section>
                      <section>
                        <h4>Ram</h4>
                        <ul>
                          {["8 Gb", "16 Gb", "24 Gb"].map((item) => {
                            return (
                              <li
                                key={item}
                                onClick={() => {
                                  handleSearchBySpics("RAM", item);
                                }}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                      <section>
                        <h4>cpu</h4>
                        <ul>
                          {["i3", "i5", "i7", "m2", "Ryzen"].map((item) => {
                            return (
                              <li
                                key={item}
                                onClick={() => {
                                  handleSearchBySpics("Processor Type", item);
                                }}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                    </>
                  ) : data[0].subCategory.name == "Mobiles" ? (
                    <>
                      <section>
                        <h4>Display Type</h4>
                        <ul>
                          {["AMOLED", "Super Amoled", "Retina"].map((item) => {
                            return (
                              <li
                                key={item}
                                onClick={() => {
                                  handleSearchBySpics("DisplayType", item);
                                }}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                      <section>
                        <h4>Mobile Ram Size</h4>
                        <ul>
                          {["4 Gb", "6 Gb", "8 Gb", "16 Gb"].map((item) => {
                            return (
                              <li
                                key={item}
                                onClick={() => {
                                  handleSearchBySpics("RAMSize", item);
                                }}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                      <section>
                        <h4>Mobile Internal Memory</h4>
                        <ul>
                          {["32 Gb", "64 Gb", "128 Gb", "256 Gb"].map(
                            (item) => {
                              return (
                                <li
                                  key={item}
                                  onClick={() => {
                                    handleSearchBySpics("InternalMemory", item);
                                  }}
                                >
                                  {item}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </section>
                    </>
                  ) : (
                    "there is no data here"
                  )
                ) : (
                  <div>there is no data here</div>
                )}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </>
  );
}
Filtration.propTypes = {
  data: PropTypes.array,
  setPriceRange: PropTypes.func,
  setSpecifications: PropTypes.func,
  priceRange: PropTypes.string,
  specifications: PropTypes.string,
};
