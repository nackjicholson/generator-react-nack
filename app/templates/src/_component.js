function <%= camelComponentName %>(React) {
  function <%= classComponentName %>({ greeting = 'Hello', message = 'World!' } = {}) {
    return <h1>{greeting}, {message}</h1>;
  }

  return <%= classComponentName %>;
}

export default <%= camelComponentName %>;
