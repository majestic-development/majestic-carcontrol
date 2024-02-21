carMenuOpen = false
RegisterCommand(Config.Menu.Command, function()
    if IsPedInAnyVehicle(PlayerPedId(), false) then
        carMenuOpen = not carMenuOpen
        SetNuiFocus(carMenuOpen, carMenuOpen)
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        local doorData = {}
        local doorNum = GetVehicleModelNumberOfSeats(GetEntityModel(veh)) - 1
        for i = 0, doorNum do
            local opened = false
            if GetVehicleDoorAngleRatio(veh, i) > 0.0 then
                opened = true
            end
            table.insert(doorData, {
                doorNum = tostring(i),
                opened = opened
            })
        end
        local mySeat = nil
        if doorNum > 10 then
            for i = -1, doorNum do
                if GetPedInVehicleSeat(veh, i) == 0 then
                else
                    mySeat = i
                end
            end
        elseif doorNum == 1 then
            for i = -1, doorNum - 1 do
                if GetPedInVehicleSeat(veh, i) == 0 then
                else
                    mySeat = i
                end
            end
        elseif doorNum == 0 then
            for i = -1, doorNum + 1 do
                if GetPedInVehicleSeat(veh, i) == 0 then
                else
                    mySeat = i
                end
            end
        else
            for i = -1, doorNum - 2 do
                if GetPedInVehicleSeat(veh, i) == 0 then
                else
                    mySeat = i
                end
            end
        end
        local retval, lights, highbeams = GetVehicleLightsState(veh)
        local hoodOpen = false
        if GetVehicleDoorAngleRatio(veh, 4) > 0.0 then
            hoodOpen = true
        end
        local trunkOpen = false
        if GetVehicleDoorAngleRatio(veh, 5) > 0.0 then
            trunkOpen = true
        end
        local indicatorState = GetVehicleIndicatorLights(veh)
        while mySeat == nil do Citizen.Wait(0) end
        SendNUIMessage({
            action = "openCarMenu", resourceName = GetCurrentResourceName(), state = carMenuOpen, align = Config.Menu.Align, styleType = Config.Menu.StyleType, carData = {
                doorNum = GetVehicleModelNumberOfSeats(GetEntityModel(veh)),
                doorData = doorData,
                vehConvertible = IsVehicleAConvertible(veh, false),
                vehConvertibleState = GetConvertibleRoofState(veh),
                engineState = GetIsVehicleEngineRunning(veh),
                playerSeat = mySeat,
                intLightState = IsVehicleInteriorLightOn(veh),
                lightsOn = lights,
                highbeamsOn = highbeams,
                trunk = trunkOpen,
                hood = hoodOpen,
                indicatorState = indicatorState
            }
        })
    end
end)

RegisterNUICallback('callback', function(data)
    if data.action == "nuiFocus" then
        carMenuOpen = false
        SetNuiFocus(false, false)
    elseif data.action == "convertVeh" then
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        if data.state == false then
            RaiseConvertibleRoof(veh, false)
        else
            LowerConvertibleRoof(veh, false)
        end
    elseif data.action == "window" then
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        local num = data.num - 1
        if data.state == true then
            RollDownWindow(veh, num)
        else
            RollUpWindow(veh, num)
        end
    elseif data.action == "changeSeat" then
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        if data.num == "driver" then
            if IsVehicleSeatFree(veh, -1) then
                SetPedIntoVehicle(PlayerPedId(), veh, -1)
            end
        else
            local num = tonumber(data.num)
            if IsVehicleSeatFree(veh, num) then
                SetPedIntoVehicle(PlayerPedId(), veh, num)
            end
        end
    elseif data.action == "engine" then
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        if GetPedInVehicleSeat(veh, -1) == PlayerPedId() then 
            SetVehicleEngineOn(veh, data.state, false, true)
        end
    elseif data.action == "alarm" then
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        SetVehicleAlarm(veh, data.state)
        if data.state == true then
            StartVehicleAlarm(veh)
            SetVehicleAlarmTimeLeft(veh, Config.AlarmDuration)
            Citizen.Wait(Config.AlarmDuration)
            SendNUIMessage({action = "closeAlarm"})
        end
    elseif data.action == "intLight" then
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        SetVehicleInteriorlight(veh, data.state)
    elseif data.action == "lights" then
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        if data.name == "normal" then
            SetVehicleLights(veh, 1)
            Citizen.Wait(500)
            SetVehicleLights(veh, 3)
        elseif data.name == "highbeams" then
            SetVehicleLights(veh, 1)
            Citizen.Wait(500)
            SetVehicleLights(veh, 3)
            SetVehicleFullbeam(veh, true)
        end
    elseif data.action == "door" then
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        if data.state == true then
            if data.number == "trunk" then
                SetVehicleDoorOpen(veh, 5, false, false)
            elseif data.number == "hood" then
                SetVehicleDoorOpen(veh, 4, false, false)
            else
                SetVehicleDoorOpen(veh, tonumber(data.number), false, false)
            end
        else
            if data.number == "trunk" then
                SetVehicleDoorShut(veh, 5, false)
            elseif data.number == "hood" then
                SetVehicleDoorShut(veh, 4, false)
            else
                SetVehicleDoorShut(veh, tonumber(data.number), false)
            end
        end
    elseif data.action == "indicator" then
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        SetVehicleIndicatorLights(veh, data.name, data.state)
    end
end)

RegisterNetEvent('majestic-carcontrol:openMenu', function()
    ExecuteCommand(Config.Menu.Command)
end)
