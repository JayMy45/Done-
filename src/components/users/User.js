export const User = ({ fullName, id }) => {
    console.log(fullName)

    return <>
        <section>
            <label>
                <input type="radio" name={fullName}
                    value={id} /> {fullName}
            </label>
        </section>

    </>
}