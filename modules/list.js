import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
  } from "./modulesReducer";
  import * as client from "./client";
  function ModuleList() {
    const handleDeleteModule = (moduleId) => {
      client.deleteModule(moduleId).then((status) => {
        dispatch(deleteModule(moduleId));
      });
    };
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
      };   
      const handleAddModule = () => {
        createModule(courseId, module).then((module) => {
          dispatch(addModule(module));
        });
      };     
      return (
        <div>
            <link href="../labs/a2/index.css" rel="stylesheet"/>
            <link href="../vendors/bootstrap-5.1.3-dist/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="../vendors/fontawesome-free-5.15.4-web/css/all.css" rel="stylesheet"/>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button className="btn btn-secondary">Collapse All</button>
                    <button className="btn btn-secondary">View Progress</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Publish All
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Publish All modules and items</a></li>
                        <li><a className="dropdown-item" href="#">Publish All modules only</a></li>
                        <li><a className="dropdown-item" href="#">Unpublish All</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </div>
                <div className="input-group-append">
                    <button className="btn btn-danger" >+Module</button>
                </div>
            </div>
            <hr/>
            <li className="list-group-item">
                <button 
                  onClick={handleAddModule} 
                  className = "btn btn-secondary">
                  Add
                </button>
                <button 
                  onClick={() => handleUpdateModule(module)} 
                  className = "btn btn-secondary">
                  Update
                </button>
                <input 
                  value={module.week}
                  onChange={(e) => dispatch(setModuleAction({...module, week: e.target.value}))}
                />
            </li>
            {modules
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                <div key={index} className="list-group">
                    <button type="button" className="list-group-item list-group-item-secondary list-group-item-action">
                    {module.week}
                    <button 
                      className="btn btn-danger float-end" 
                      onClick={() => handleDeleteModule(module._id)}>
                      Delete
                    </button>
                    <button 
                      onClick={() => dispatch(setModuleAction(module))} 
                      className = "btn btn-dark float-end">
                      Edit
                    </button>
                    </button>
                    {module.items.map((item, itemIndex) => (
                    <button 
                        key={itemIndex} 
                        type="button" 
                        className="list-group-item list-group-item-action" 
                        style={{paddingLeft: item.padding}}
                    >
                        {item.text}
                        {item.icon && <i className="fa fa-check-circle float-end wd-fg-color-green" aria-hidden="true"></i>}
                    </button>
                    ))}
                </div>
            ))}
        </div>
      );
  }
  export default ModuleList;
  
  

