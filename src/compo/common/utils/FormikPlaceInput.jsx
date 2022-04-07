import { FormControl, FormHelperText, Input } from '@material-ui/core'
import React from 'react'
import { useField } from 'formik';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

export default function FormikPlaceInput({ label, options, ...props }) {
    const [field, meta, helpers] = useField(props);

    function handleSelect(address) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => helpers.setValue({ address, latLng }))
            .catch(error => helpers.setError(error));
    };

    function handleBlur(e) {
        field.onBlur(e);
        if (!field.value.latLng) {
            helpers.setValue({address: '', latLng: null});
        }
    }

    return (
        <PlacesAutocomplete
            value={field.value['address']}
            onChange={value => helpers.setValue({ address: value })}
            onSelect={value => handleSelect(value)}
            searchOptions={options}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <FormControl error={meta.touched && !!meta.error} >
                    <FormHelperText> {label} </FormHelperText>
                    <Input {...getInputProps({ name: field.name, onBlur: e => handleBlur(e), ...props })} />
                    {meta.touched && meta.error && (
                        <FormHelperText> {meta.error['address']} </FormHelperText>
                    )}
                    {suggestions?.length > 0 && (
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#f5f5f5', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                        key={suggestion.placeId}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </FormControl>
            )}
        </PlacesAutocomplete>
    )
}