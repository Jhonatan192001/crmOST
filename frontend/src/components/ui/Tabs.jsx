import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from "../../lib/utils";

const Tabs = ({ children, className }) => {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  );
};

const TabsList = ({ children, className }) => {
  return (
    <div className={cn("flex border-b", className)}>
      {children}
    </div>
  );
};

const TabsTrigger = ({ children, value, activeValue, onClick, className }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 font-semibold",
        value === activeValue
          ? "border-b-2 border-blue-500 text-blue-500"
          : "text-gray-500 hover:text-gray-700",
        className
      )}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, activeValue, className }) => {
  if (value !== activeValue) return null;
  return <div className={cn("mt-4", className)}>{children}</div>;
};

const TabsContainer = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <Tabs>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, {
            children: React.Children.map(child.props.children, (trigger) => 
              React.cloneElement(trigger, {
                activeValue: activeTab,
                onClick: setActiveTab
              })
            )
          });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeValue: activeTab });
        }
        return child;
      })}
    </Tabs>
  );
};

Tabs.propTypes = { children: PropTypes.node, className: PropTypes.string };
TabsList.propTypes = { children: PropTypes.node, className: PropTypes.string };
TabsTrigger.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  activeValue: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};
TabsContent.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  activeValue: PropTypes.string,
  className: PropTypes.string
};
TabsContainer.propTypes = {
  children: PropTypes.node,
  defaultValue: PropTypes.string.isRequired
};

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsContainer };