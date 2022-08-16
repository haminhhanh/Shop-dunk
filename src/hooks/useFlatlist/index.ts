import { useCallback, useRef, useMemo, useEffect } from 'react';
import { useRequest, useInfiniteScroll } from 'ahooks';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const useFlatlist = (
  service: any,
  { autoRefreshOnFocus = false, ...options },
) => {
  const isFirstLoad = useRef(true);
  const focusRef = useRef(`${Math.random()}`);
  const isFocused = useIsFocused();

  const focused = useMemo(() => {
    if (isFocused) {
      const newValue = `${Math.random()}`;
      return newValue;
    }
    return focusRef.current;
  }, [isFocused]);

  const onEndReachedCalledDuringMomentum = useRef(true);

  const request = useInfiniteScroll(service, {
    // loadMore: true,
    // debounceWait: 250,
    isNoMore: e => {
      return e?.data && e?.total && e?.data?.length < e?.total;
    },
    ...options,
    onSuccess: r => {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
      }

      onEndReachedCalledDuringMomentum.current = false;

      options.onSuccess && options.onSuccess(r);
    },
  });

  const { refresh, loadMore, loading } = request;

  const keyExtractor = useCallback(item => `${item.id}`, []);

  const onEndReached = () => {
    if (
      options.loadMore &&
      !onEndReachedCalledDuringMomentum.current &&
      !request.noMore
    ) {
      onEndReachedCalledDuringMomentum.current = true;
      loadMore();
    }
  };

  const flatListProps = {
    refreshing: loading,
    onRefresh: refresh,
    keyExtractor,
    data: request?.data?.data,
    showsVerticalScrollIndicator: false,
    scrollEventThrottle: 16,
    onEndReachedThreshold: 0.1,
    removeClippedSubviews: false,
    onEndReached,
    contentContainerStyle: styles.contentContainerStyle,
    ListFooterComponent: () => {
      if (request?.loadingMore) {
        return null;
      }

      if (!request?.loadingMore && request?.noMore && options?.contentFooter) {
        return options?.contentFooter();
      }
      return null;
    },
  };

  useEffect(() => {
    if (
      autoRefreshOnFocus &&
      focusRef.current !== focused &&
      !isFirstLoad.current
    ) {
      focusRef.current = focused;
      refresh();
    }
  }, [focused, refresh, autoRefreshOnFocus]);

  return { ...request, flatListProps };
};

export default useFlatlist;

const styles = StyleSheet.create({
  footerContainer: {
    alignSelf: 'center',
  },
  loadmore: {
    fontSize: 13,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    fontFamily: 'Prompt-Bold',
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
});
