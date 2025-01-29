  useEffect(() => {
    (async () => {
      try {
      const response=await call({ email, userNumber: axa_uid_racf, name, axaUiRdu: axa_uid_rdu, axaType: axa_type });
      if (response?.authority) {
        (oidcUser as any).authority = response.authority;
      }
        setUserAllowed(true);
      } catch (error) {
        console.error("Error while sending user infos to Maam", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, axa_uid_racf, name, axa_type]);
