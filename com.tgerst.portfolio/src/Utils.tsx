import { useEffect } from "react";

export const useClickOutEvent = (ref: any, callback: any) => {
  useEffect(() => {
      function handleClickOutside(event: any) {
          if (ref.current && !ref.current.contains(event.target)) {
            callback()
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
}

// export const useDragEvent = (ref: any, state: any, setState: any, callback: any) => {
//   useEffect(() => {
//     function handleClickOutside(event: any) {
//         if (ref.current && !ref.current.contains(event.target)) {
//           callback()
//         }
//     }
//     document.addEventListener("mousemove", handleClickOutside);
//     document.addEventListener("mouseup", handleClickOutside);
//     return () => {
//         document.removeEventListener("mousemove", handleClickOutside);
//         document.addEventListener("mouseup", handleClickOutside);
//     };
// }, [state.dragging]);
// }