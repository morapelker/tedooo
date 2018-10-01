import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import './commonCss.css'
import {bgColor} from "../../api/apiConstants";

function renderInput(inputProps) {
    const {...other} = inputProps;
    return (
        <input
            className={'inputField'}
            autoComplete={'off'}
            name={'search'}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </span>
                    ) : (
                        <strong key={String(index)} style={{fontWeight: 500}}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const {containerProps, children} = options;
    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

function getSuggestions(value, suggestions) {
    const inputValue = value.trim().toLowerCase();
    let count = 0;
    if (inputValue.length === 0)
        return [];
    const arr = inputValue.split(' ');
    return suggestions.filter(suggestion => {
            if (!suggestion.label)
                return false;
            if (count >= 5)
                return false;
            const lCase = suggestion.label.toLowerCase();
            return arr.every(item => lCase.includes(item));
        });
}

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
});

class AutoCompleteField extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            suggestions: [],
        };
    }

    componentWillReceiveProps({value, suggestions, method}) {
        if (method === 'type') {
            this.setState({
                suggestions: getSuggestions(value, suggestions)
            });
        }
    }

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.suggestions),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    classes,
                    placeholder: this.props.placeholder,
                    value: this.props.value,
                    onChange: this.props.onChange,
                    onBlur: this.props.onBlur,
                    onKeyPress: e => {
                        if (e.key === 'Enter') {
                            const s = this.props.value && this.props.suggestions ? getSuggestions(this.props.value, this.props.suggestions) : [];
                            if (s.length === 1 && s[0].label !== this.props.value)
                                this.props.onChange(undefined, {newValue: s[0].label});
                            else if (this.props.onEnter)
                                this.props.onEnter();

                        }
                    },
                    id: this.props.id,
                    name: this.props.name,
                    style: {
                        borderRadius: 0,
                        borderWidth: 3,
                        borderColor: bgColor,
                        fontFamily: 'Skia, sans-serif',
                    }
                }}
            />
        );
    }
}

AutoCompleteField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoCompleteField);
