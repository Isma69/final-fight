import React from "react";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";

const Monster = () => {
  const monster = useSelector((state) => state.fight.monsters[0]);

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="card-monstre col-sm-12">
            <div id="monsterCard">
              <div className="text-center">
                <div className="row align-items-center">
                <div className="col-sm-3">
                    <h5 className="card-title">{monster.name}</h5>
                  </div>
                  <div className="col-sm-9 text-right">
                    <img
                      className="img-fluid"
                      src="/assets/madara.png"
                      alt="monster"
                      style={{ width: '200px', margin:'20px' }} 
                    />
                  </div>
                </div>
              </div>
              <ProgressBar
                pv={monster.hp}
                pvMax={monster.maxHp}
                bgType="bg-danger"
                faType="fa-heart"
                barName=" : pv"
              />
               <ProgressBar
                pv={monster.rage}
                pvMax={monster.rageMax}
                bgType="bg-danger"
                faType="fa-heart"
                barName=" : rage"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Monster;
