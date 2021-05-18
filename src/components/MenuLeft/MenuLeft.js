import React, { useEffect, useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import "./MenuLeft.scss";
import { isUserAdmin } from "../../utils/Api";
import BasicModal from "../Modal/BasicModal/BasicModal";
import { AddArtistForm } from "../Artists/AddArtisForm/AddArtistForm";
import AddAlbumForm from "../Album/AddAlbumForm/AddAlbumForm";

const MenuLeft = ({ user, location }) => {
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    isUserAdmin(user.uid).then((resp) => {
      setUserAdmin(resp);
    });
  }, [user]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  const handlerModal = (type) => {
    switch (type) {
      case "artist":
        setTitleModal("Nuevo artista");
        setContentModal(<AddArtistForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "album":
        setTitleModal("Nuevo album");
        setContentModal(<AddAlbumForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "song":
        setTitleModal("Nueva cancion");
        setContentModal(<h2>Formulario nueva cancion</h2>);
        setShowModal(true);
        break;
      default:
        setTitleModal(null);
        setContentModal(null);
        setShowModal(false);
        break;
    }
  };

  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">
          <Menu.Item as={Link} to="/" active={activeMenu === "/"} onClick={handlerMenu}>
            <Icon name="home" /> Inicio
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/artists"
            active={activeMenu === "/artists"}
            onClick={handlerMenu}
          >
            <Icon name="music" /> Artistas
          </Menu.Item>
        </div>
        {userAdmin && (
          <div className="footer">
            <Menu.Item onClick={() => handlerModal("artist")}>
              <Icon name="plus square outline" /> Nuevo Artista
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal("album")}>
              <Icon name="plus square outline" /> Nuevo Album
            </Menu.Item>
            <Menu.Item onClick={() => handlerModal("song")}>
              <Icon name="plus square outline" /> Nuevo Cancion
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  );
};

export default withRouter(MenuLeft);
