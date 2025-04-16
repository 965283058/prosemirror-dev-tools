import React, { MouseEventHandler } from "react";
import "@compiled/react";
import { Dock } from "react-dock";
import { Tab, Tabs, TabList, TabPanel } from "./components/tabs";
import {
  devToolsOpenedAtom,
  devToolsSizeAtom,
  devToolTabIndexAtom,
} from "./state/global";
import StateTab from "./tabs/state";
import SchemaTab from "./tabs/schema";
import PluginsTab from "./tabs/plugins";
import StructureTab from "./tabs/structure";
import CSSReset from "./components/css-reset";
import { NodePicker, NodePickerTrigger } from "./components/node-picker";
import theme from "./theme";
import { useAtom, useAtomValue } from "jotai";
import { useNodePicker } from "./state/node-picker";

const CloseButton: React.FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}> = ({ children, onClick }) => (
  <button
    data-test-id="__prosemirror_devtools_close_button__"
    onClick={onClick}
    css={{
      background: "none",
      border: "none",
      position: "absolute",
      right: 0,
      color: theme.white60,
      fontSize: "18px",

      "&:hover": {
        cursor: "pointer",
        background: theme.white05,
        color: theme.text,
      },

      "&:focus": {
        outline: "none",
      },
    }}
  >
    {children}
  </button>
);

type DevToolsExpandedProps = {
  //
};
export default function DevToolsExpanded(props: DevToolsExpandedProps) {
  const [isOpen, setIsOpen] = useAtom(devToolsOpenedAtom);
  const defaultSize = useAtomValue(devToolsSizeAtom);
  const [tabIndex, setTabIndex] = useAtom(devToolTabIndexAtom);
  const updateBodyMargin = React.useCallback((devToolsSize: number) => {
    const size = devToolsSize * window.innerHeight;
    document.querySelector("html")!.style.marginBottom = `${size}px`;
  }, []);
  const [nodePicker, nodePickerAPI] = useNodePicker();
  const toggleOpen = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const renderTab = React.useCallback(({ index }: { index: string }) => {
    switch (index) {
      case "state":
        return <StateTab />;
      case "plugins":
        return <PluginsTab />;
      case "schema":
        return <SchemaTab />;
      case "structure":
      default:
        return <StructureTab />;
    }
  }, []);

  const renderDockContent = React.useCallback(() => {
    return (
      <div
        data-test-id="__prosemirror_devtools_container__"
        css={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: theme.mainBg,
          fontFamily: "Helvetica Neue, Calibri Light, Roboto, sans-serif",
          fontSize: "13px",
        }}
      >
        <CloseButton onClick={toggleOpen}>×</CloseButton>
        <NodePickerTrigger
          onClick={nodePickerAPI.activate}
          isActive={nodePicker.active}
        />

        <Tabs onSelect={setTabIndex} selectedIndex={tabIndex}>
          <TabList>
            <Tab index="structure">Structure</Tab>
            <Tab index="state">State</Tab>
            <Tab index="plugins">Plugins</Tab>
            <Tab index="schema">Schema</Tab>
          </TabList>

          <TabPanel>{renderTab}</TabPanel>
        </Tabs>
      </div>
    );
  }, [nodePicker, nodePickerAPI, tabIndex, isOpen, renderTab]);

  return (
    <CSSReset>
      <NodePicker />
      <Dock
        position="bottom"
        dimMode="none"
        isVisible
        defaultSize={defaultSize}
        onSizeChange={updateBodyMargin}
        zIndex={1}
        fluid={true}
        duration={0}
      >
        {renderDockContent}
      </Dock>
    </CSSReset>
  );
}
