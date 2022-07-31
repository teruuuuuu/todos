module Main exposing (..)

-- Press buttons to increment and decrement a counter.
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/buttons.html
--


import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)

-- MAIN


main =
  Browser.sandbox { init = init, update = update, view = view }



-- TODO ITEM
type alias TodoItem = {title: String, done: Bool}

-- MODEL


type alias Model = 
  { input: String
  , todos: List TodoItem
  }


init : Model
init =
  { input = "", todos = []}



-- UPDATE

type Msg
  = Add
  | Input String
  | Check TodoItem Int


update : Msg -> Model -> Model
update msg model =
  case msg of
    Add ->
      addTodo (String.trim model.input) model
    Input text ->
      {model | input = text}
    Check todoItem index ->
      checkTodo todoItem index model
    
addTodo : String -> Model -> Model
addTodo todoText model = case todoText of
  "" -> model
  _ -> {model | input = "", todos = List.append model.todos [{title = model.input, done = False}]}


checkTodo : TodoItem -> Int -> Model -> Model
checkTodo todoItem index model = {model | 
    todos = List.indexedMap (\curindex -> \curtodo -> 
        if curindex == index then {title = todoItem.title, done = not todoItem.done}
        else curtodo) model.todos}


-- VIEW


view : Model -> Html Msg
view model =
  div []
    [div [] 
    [ 
      div [] [text "todo" ]
    , div [] [
         viewInput "text" model.input Input
        , button [ onClick Add ] [ text "add" ]
    ]
    , div [] (List.map viewTodo (List.indexedMap Tuple.pair model.todos))
    ]]


viewInput : String -> String -> (String -> msg) -> Html msg
viewInput t v toMsg =
  input [ type_ t, value v, onInput toMsg ] []

viewTodo : (Int, TodoItem) -> Html Msg
viewTodo (index, todoItem) = div [
        style "display" "block ruby"
        , style "cursor" "pointer"
        , onClick (Check todoItem index)
    ] [
        div [] [ if todoItem.done then text "☑︎" else text "▫︎"]
        ,div [] [text todoItem.title]
    ]