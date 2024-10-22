"use client"
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useRef } from "react";
import constants from "./contants";
import styles from "./tabs.module.scss";

type Props = {
  classes?: string,
  children: React.ReactNode
}

export const Tabs: React.FC<Props> = ({
  classes,
  children
}) => {
  const [currentTab, setCurrentTab] = useState<string>('tab-1');
  const underline = useRef<HTMLDivElement | null>(null);

  const getActiveWidth = () => {
    if (window && document) {
      const getAllTabs = document.querySelectorAll(`.${styles.ItemName}`);
      let paddingLeft = 0,
        i = 0;
      while (!getAllTabs[i].classList.contains(styles.active)) {
        paddingLeft += getAllTabs[i].getBoundingClientRect().width + constants.TAB_PADDING;
        i++;
      }
      const currentWidth = document.querySelector(`.${styles.active}`)?.getBoundingClientRect().width;
      if (underline.current) {
       underline?.current?.setAttribute(
          "style",
          `width: ${currentWidth}px; left: ${paddingLeft}px;`
        );
      }
    }
  };

  const onClickTab = (e: React.MouseEvent<HTMLDivElement>) => {

    const element = e.currentTarget as HTMLElement
    const elementNumber = element ?  element.getAttribute("id") : 'tab-1';
    setCurrentTab(elementNumber as string);
  };

  useEffect(() => {
    document.fonts.ready.then(function () {
      getActiveWidth();
    });

  }, []);

  useEffect(() => {
    getActiveWidth();
  }, [currentTab]);

  return (
    <div
      role="tablist"
      className={clsx(styles.tabsContainer, classes)}
    >
      <div className={clsx(styles.tabLinks, "tabs-container")}>
        {constants.TAB_NAMES.length > 0 &&
          constants.TAB_NAMES.map((item, key) => (
            <div
              key={key}
              id={`tab-${key+1}`}
              onClick={onClickTab}
              className={clsx(
                styles.ItemName,
                `tab-${key+1}` == currentTab ? styles.active : ""
              )}
            >
              {item}
            </div>
          ))}
        <div className={styles.underline} ref={underline}></div>
      </div>
      <div className={styles.TabContent}>
        {children}
      </div>
    </div>
  );
};
