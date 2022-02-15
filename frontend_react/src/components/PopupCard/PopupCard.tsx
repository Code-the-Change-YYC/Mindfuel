import { AssetType } from "../../utils/AssetType.enum";
import { Card, Image } from "react-bootstrap";
import { User } from "../../utils/User";
import React from "react";
import _ from "lodash";
import styles from "./PopupCard.module.css";
import wondervilleLogo from "../../res/assets/wonderville-logo.png";

type PopupCardProps = {
  user: User;
};

const PopupCard = (props: PopupCardProps) => {
  const user = props.user;
  const loc = user.payload.location;
  const imageUrl =
    user.type === AssetType.WondervilleSession ||
    _.isNil(user.payload.asset?.imageUrl)
      ? wondervilleLogo
      : user.payload.asset?.imageUrl;
  const name =
    user.type === AssetType.WondervilleSession
      ? "Wonderville Session"
      : user.payload.asset?.name;

  if (loc.city && loc.region_name) {
    var locString = `${loc.city}, ${loc.region_name}`;
  } else {
    locString = loc.country_name;
  }

  return (
    <Card className={styles.card + " " + styles.mainWrapper}>
      <Image className={styles.assetImage} src={imageUrl} />
      <div className={styles.dateContainer}>
        <span className={styles.dateText}>
          {user.date.toLocaleDateString("en-CA")}
        </span>
      </div>
      <div className={styles.wrapper + " " + styles.assetText}>{name}</div>
      <div className={styles.wrapper + " " + styles.locationText}>
        {locString}
      </div>
    </Card>
  );
};

export default PopupCard;
