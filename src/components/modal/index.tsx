import React, { ReactNode } from "react";
import { Modal } from "antd";

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>> | any ;
  type?: string;
}

const Modals = ({ children, open, setOpen, type }: Props) => {

  return (
    <div>
      <Modal
        title=""
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
        style={{ borderRadius: "10px", width: "1000px" }}
        closable={false}
        destroyOnClose
        keyboard
        className={`xl:!w-[32%] 2xl:!w-[32%] md:!w-[50%] !w-[90%]`}
      >
        {children}
      </Modal>
    </div>
  );
};

export default Modals;
