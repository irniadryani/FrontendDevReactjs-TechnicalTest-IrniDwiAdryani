export function getBackendHost() {
  // Function getBackendHost() dia manggil URL api kita dari .env
  return (
    import.meta.env?.VITE_BACKEND_HOST?.replace(/\/$/, "") ||
    window.location.origin
  );
}
