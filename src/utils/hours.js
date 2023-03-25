export const newHours = (setHours) => {
    setHours(new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(new Date()));
}