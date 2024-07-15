import { useRef } from "react";

export function useArrayRef<TKey, TNode>() {
  const itemsRef = useRef<Map<TKey, TNode>>(null);
  function getMap() {
    if (!itemsRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  function get(id: TKey) {
    return getMap().get(id);
  }

  function set(id: TKey, node: TNode) {
    getMap().set(id, node);
  }

  function remove(id: TKey) {
    getMap().delete(id);
  }

  function refCallback(id: TKey, node: TNode | null) {
    if (node) {
      set(id, node);
    } else {
      remove(id);
    }
  }

  return { get, refCallback };
}
